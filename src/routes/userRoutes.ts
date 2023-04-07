import express, { Router } from 'express';
import { UserController } from '../user/UserController';
import User from '../user/UserModel';
import { UserService } from '../user/UserService';
import { UserRepository } from '../user/UserRepository';

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes: Router = express.Router();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', userController.findAllUsers);
userRoutes.get('/:id', userController.findUserById);
userRoutes.delete('/:id', userController.deleteUserById);
userRoutes.put('/:id', userController.updateUserById);

export default userRoutes;
