import express, { Router } from 'express';
import { UserController } from '../user/UserController';
import User from '../user/UserModel';
import { UserService } from '../user/UserService';
import { UserRepository } from '../user/UserRepository';
import { validate } from '../validation/Validator';
import { updateUserSchema, userSchema } from '../user/UserValidation';
import { protect } from '../auth/AuthController';

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes: Router = express.Router();

userRoutes.post('/', validate(userSchema), userController.createUser);
userRoutes.get('/', protect, userController.findAllUsers);
userRoutes.get('/:id', protect, userController.findUserById);
userRoutes.delete('/:id', protect, userController.deleteUserById);
userRoutes.put(
  '/:id',
  protect,
  validate(updateUserSchema),
  userController.updateUserById
);

export default userRoutes;
