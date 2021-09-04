import { IShort, Short } from '../models/short';

/**
 * Create short url and manage short url table
 */
class Shorts {
  /**
   * generate a 8 bit hash of url
   * @param originUrl input url max length should less than 255
   * @returns an 8 btyes base64 url
   */
  static genShortUrl(originUrl: string): string {
    const base64Url = Buffer.from(originUrl).toString('base64');
    return base64Url.slice(8);
  }

  /**
   * creat a row into database
   * @param originUrl
   * @param shortUrl
   * @param expiration expratoin time in seconds
   */
  // eslint-disable-next-line max-len
  static async create(originUrl: string, shortUrl: string, expirationInMins: number = -1): Promise<IShort> {
    const data: IShort = await new Short({
      originUrl,
      shortUrl,
      expirationInMins,
    }).save();
    return data;
  }

  static async findOneByShortUrl(shortUrl: string): Promise<IShort | null> {
    const data = await Short.findOne({ shortUrl }).exec();
    return data;
  }
}
