import express, { Router } from 'express';
import { UserController } from '../user/UserController';
import User from '../user/UserModel';
import { UserService } from '../user/UserService';
import { UserRepository } from '../user/UserRepository';
import { validate } from '../validation/Validator';
import { updateUserSchema, userSchema } from '../user/UserValidation';

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes: Router = express.Router();

userRoutes.post('/', validate(userSchema), userController.createUser);
userRoutes.get('/', userController.findAllUsers);
userRoutes.get('/:id', userController.findUserById);
userRoutes.delete('/:id', userController.deleteUserById);
userRoutes.put(
  '/:id',
  validate(updateUserSchema),
  userController.updateUserById
);

export default userRoutes;
