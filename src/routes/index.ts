import { Router } from 'express';
import userRoutes from './userRoutes';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/user`, userRoutes);

export default routes;
