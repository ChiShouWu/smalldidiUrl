import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import Shorts from './controllers/shorts';
import shortRouter from './routers/shorts.route';
import './configs/database';

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

dotenv.config({ path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`) });

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/short', shortRouter);

app.listen(PORT, () => {
  winston.info(`[server]: Server is running at http://localhost:${PORT}`);
});

// start check expired url
setInterval(() => { Shorts.checkExpired(); }, 60000);
