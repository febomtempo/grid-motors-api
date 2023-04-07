import { Model } from 'mongoose';
import { IUser } from './UserModel';

export class UserRepository {
  constructor(private readonly userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async createUser(user: IUser): Promise<IUser | null> {
    const newUser = await this.userModel.create(user);
    newUser.password = '';
    return newUser;
  }

  async findAllUsers(): Promise<IUser[]> {
    const user = await this.userModel.find().select('-__v');
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
