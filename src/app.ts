import express from 'express';
import morgan from 'morgan';
import winston from 'winston';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  winston.info(`[server]: Server is running at https://localhost:${PORT}`);
});

app.use(express.json);
app.use(morgan('combined'));
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
