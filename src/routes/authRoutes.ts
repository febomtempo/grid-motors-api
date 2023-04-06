import express, { Router } from 'express';
import { authenticate } from '../auth/AuthController';

const authRoutes: Router = express.Router();

authRoutes.post('/', authenticate);

export default authRoutes;
