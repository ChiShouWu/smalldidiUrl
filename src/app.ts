import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import Shorts from './controllers/shorts';
import shortRouter from './routers/shorts.route';
import './configs/database';

const app = express();
const PORT = 3000;

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
