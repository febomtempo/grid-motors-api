import { IUser } from './UserModel';
import { Request, Response } from 'express';
import { UserService } from './UserService';
import { errorHandler } from '../utils/ErrorHandling';
import { IUserQueryParams } from './UserRepository';

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
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const params: IUserQueryParams = req.query;
      const totalDocs = await this.userService.countDocuments(params);
      const user = await this.userService.findAllUsers(page, limit, params);
      if (user.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'No users found',
        });
      }
      return res.status(200).json({
        users: user,
        total: totalDocs,
        limit: limit,
        offset: page,
        offsets: Math.ceil(totalDocs / limit),
      });
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
