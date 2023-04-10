import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import connectMongo from './database/connect';
import routes from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../src/swagger/swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

connectMongo();

app.use(routes);

app.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: `API Online!!!`,
  });
});

export default app;
