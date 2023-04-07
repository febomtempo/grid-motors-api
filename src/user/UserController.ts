import { IUser } from './UserModel';
import { Request, Response } from 'express';
import { UserService } from './UserService';
import { errorHandler } from '../utils/ErrorHandling';

export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: IUser = req.body;
      const newUser = await this.userService.createUser(user);
      return res.status(201).json(newUser);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  findAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await this.userService.findAllUsers();
      return res.status(200).json(user);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  findUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);
      return res.status(200).json(user);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.userService.deleteUserById(id);
      return res.status(204).json(null);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  updateUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const data: IUser = req.body;
      const user = await this.userService.updateUserById(id, data);
      return res.status(200).json({
        status: 'success',
        message: 'user updated',
        user,
      });
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };
}
