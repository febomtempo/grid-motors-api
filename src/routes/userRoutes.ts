import express, { Router } from 'express';
import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserById,
} from '../user/UserController';

const userRoutes: Router = express.Router();
userRoutes.post('/', createUser);
userRoutes.get('/', findAllUsers);
userRoutes.get('/:id', findUserById);
userRoutes.delete('/:id', deleteUserById);

export default userRoutes;
