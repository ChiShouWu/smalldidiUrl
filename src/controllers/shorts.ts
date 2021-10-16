/* eslint-disable max-len */
import { SHA256 } from 'crypto-js';
import HttpRequestError from './ApiError';
import { IShort, Short } from '../models/short';
import Logger from '../configs/Logger';
/**
 * Create short url and manage short url table
 */
export class Shorts {
  /**
   * generate a 8 bit hash of url
   * @param originUrl input url max length should less than 255
   * @returns an 8 btyes base64 url
   */
  static genShortUrl(originUrl: string): string {
    const hashUrl = SHA256(originUrl).toString();
    return hashUrl.slice(0, 8);
  }

  /**
   * creat a row into database
   * @param originUrl
   * @param shortUrl
   * @param expiration expratoin time in seconds
   */
  // eslint-disable-next-line max-len
  static async create(originUrl: string, shortUrl: string, expireAt: Date | null = null): Promise<IShort | null> {
    try {
      const data: IShort = await new Short({
        originUrl,
        shortUrl,
        expireAt,
      }).save();
      return data;
    } catch (e) {
      HttpRequestError.checkError(e as HttpRequestError);
    }
    return null;
  }

  /**
   * get url from hash, and +1 of count of this url collect.
   * @param hash
   */
  static async getUrl(hash: string): Promise<IShort | null> {
    try {
      const data = await Short.findOneAndUpdate({ shortUrl: hash }, { $inc: { usageCount: 1 } }).exec();
      if (!data) throw new HttpRequestError(404, 'url not found');
      return data;
    } catch (e) {
      HttpRequestError.checkError(e as HttpRequestError);
    }
    return null;
  }

  /**
   * remove expired data from DB
   */
  static checkExpired() {
    Logger.debug('checked expired');
    try {
      const now = new Date();
      Short.deleteMany({ expireAt: { $lte: now } });
    } catch (e) {
      Logger.error(`method: checkExipired detail: ${(e as Error).message}`);
    }
  }
}
export default Shorts;
