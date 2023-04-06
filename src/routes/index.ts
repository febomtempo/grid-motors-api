import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/authenticate`, authRoutes);

export default routes;
