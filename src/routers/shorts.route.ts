/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import Shorts from '../controllers/shorts';
import HttpRequestError from '../controllers/ApiError';

const shortRouter = express.Router();
shortRouter.post('/',
  body('url').isLength({ max: 200 }).isURL(),
  body('expireAt').optional().isISO8601(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const hash = Shorts.genShortUrl(req.body.url);
      const data = await Shorts.create(req.body.url, hash, req.body.expireAt);
      return res.status(200).json(data).send();
    } catch (e) {
      const error = e as HttpRequestError;
      return res.status(error.status).send(error.message);
    }
  });
shortRouter.get('/:hash',
  param('hash').isLength({ min: 8, max: 8 }),
  async (req: Request, res: Response) => {
    try {
      const data = await Shorts.getUrl(req.params.hash);

      return res.status(200).json({ url: data!.originUrl }).send();
    } catch (e) {
      const error = e as HttpRequestError;

      return res.status(error.status).send(error.message);
    }
  });
export default shortRouter;
