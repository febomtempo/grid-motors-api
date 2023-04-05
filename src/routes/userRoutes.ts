import express, { Router } from 'express';
import { createUser } from '../user/UserController';

const userRoutes: Router = express.Router();
userRoutes.post('/', createUser);

export default userRoutes;
