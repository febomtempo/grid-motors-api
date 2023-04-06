import express, { Router } from 'express';
import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUserById,
} from '../user/UserController';

const userRoutes: Router = express.Router();
userRoutes.post('/', createUser);
userRoutes.get('/', findAllUsers);
userRoutes.get('/:id', findUserById);
userRoutes.delete('/:id', deleteUserById);
userRoutes.put('/:id', updateUserById);

export default userRoutes;
