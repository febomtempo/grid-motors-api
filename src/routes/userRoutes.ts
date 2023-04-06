import express, { Router } from 'express';
import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUserById,
} from '../user/UserController';
import { protect } from '../auth/AuthController';

const userRoutes: Router = express.Router();
userRoutes.post('/', createUser);
userRoutes.get('/', protect, findAllUsers);
userRoutes.get('/:id', protect, findUserById);
userRoutes.delete('/:id', protect, deleteUserById);
userRoutes.put('/:id', protect, updateUserById);

export default userRoutes;
