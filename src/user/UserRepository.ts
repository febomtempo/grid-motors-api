import { Model } from 'mongoose';
import { IUser } from './UserModel';

export interface IUserQueryParams {
  name?: string;
  cpf?: string;
  birth?: Date;
  email?: string;
  password?: string;
  cep?: string;
  qualified?: string;
  patio?: string | null;
  complement?: string | null;
  neighborhood?: string | null;
  locality?: string;
  uf?: string;
}

export class UserRepository {
  constructor(private readonly userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async createUser(user: IUser): Promise<IUser | null> {
    const newUser = await this.userModel.create(user);
    newUser.password = '';
    return newUser;
  }

  async countDocuments(params: IUserQueryParams): Promise<number> {
    const totalDocs = await this.userModel.countDocuments(params);
    return totalDocs;
  }

  async findAllUsers(
    page: number,
    limit: number,
    params: IUserQueryParams
  ): Promise<IUser[]> {
    const skip = (page - 1) * limit;
    const user = await this.userModel
      .find()
      .find(params)
      .skip(skip)
      .limit(limit)
      .select('-__v');
    return user;
  }

  async findUserById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findById(id).select('-__v');
    return user;
  }

  async deleteUserById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async updateUserById(id: string, data: IUser): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}
