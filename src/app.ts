import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import connectMongo from './database/connect';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

connectMongo();

app.use(routes);

app.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: `API Online!!!`,
  });
});

export default app;
