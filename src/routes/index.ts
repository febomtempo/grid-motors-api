import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import carRoutes from './carRoutes';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/car`, carRoutes);
routes.use(`${prefixRoutes}/authenticate`, authRoutes);

export default routes;
