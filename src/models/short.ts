import { model, Schema } from 'mongoose';

interface IShort {
  originUrl: string,
  shortUrl: string,
  createAt: Date,
  expireAt: Date,
  usageCount: Number,
}
const ShortSchema = new Schema({
  originUrl: { type: String, require: true },
  shortUrl: { type: String, require: true },
  createAt: { type: Date, require: true, default: Date.now },
  expireAt: { type: Date },
  usageCount: { type: Number, default: 0 },
});
const Short = model<IShort>('ShortUrl', ShortSchema);

export { IShort, Short };
