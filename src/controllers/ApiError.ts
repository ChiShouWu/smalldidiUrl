import winston from 'winston';

export default class HttpRequestError extends Error {
  constructor(public status: number, public message: string) {
    super();
    this.status = status;
    this.message = message;
    winston.error(`status: ${status}, message: ${message}`);
  }

  static checkError(e: HttpRequestError) {
    if (e.status > 500) {
      throw new HttpRequestError(500, 'Server Error');
    }
    throw e;
  }
}
