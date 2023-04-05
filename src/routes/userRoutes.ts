import express, { Router } from 'express';
import { createUser, findUserById } from '../user/UserController';

const userRoutes: Router = express.Router();
userRoutes.post('/', createUser);
userRoutes.get('/:id', findUserById);

export default userRoutes;
