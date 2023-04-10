import axios from 'axios';
import { IUser } from './UserModel';
import { IUserQueryParams, UserRepository } from './UserRepository';
import { errorMessage } from '../utils/ErrorHandling';
import { isObjectIdOrHexString } from 'mongoose';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getCepData(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      const viaCepData = response.data;
      return viaCepData;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to get cep data: ${err.message}`);
      } else {
        throw new Error(`Failed to get cep data: ${err}`);
      }
    }
  }

  checkCepData(user: IUser) {
    if (!user.patio || !user.complement || !user.neighborhood) {
      user.patio = null;
      user.complement = null;
      user.neighborhood = null;
    }
  }

  async addCepData(cep: string, user: IUser) {
    try {
      const cepData = await this.getCepData(cep);
      user.patio = cepData.logradouro;
      user.complement = cepData.complemento;
      user.neighborhood = cepData.bairro;
      user.locality = cepData.localidade;
      user.uf = cepData.uf;
      this.checkCepData(user);
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to add cep data: ${err.message}`);
      } else {
        throw new Error(`Failed to add cep data: ${err}`);
      }
    }
  }

  async createUser(user: IUser): Promise<IUser | null> {
    try {
      await this.addCepData(user.cep, user);
      const newUser = await this.userRepository.createUser(user);
      return newUser;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to create user: ${err.message}`);
      } else {
        throw new Error(`Failed to create user: ${err}`);
      }
    }
  }

  async countDocuments(params: IUserQueryParams): Promise<number> {
    const totalDocs = await this.userRepository.countDocuments(params);
    return totalDocs;
  }

  async findAllUsers(
    page: number,
    limit: number,
    params: IUserQueryParams
  ): Promise<IUser[]> {
    try {
      const user = await this.userRepository.findAllUsers(page, limit, params);
      return user;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find users: ${err.message}`);
      } else {
        throw new Error(`Failed to find users: ${err}`);
      }
    }
  }
  async findUserById(id: string): Promise<IUser | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const user = await this.userRepository.findUserById(id);
      if (!user) {
        throw new Error(`ID not found`);
      }
      return user;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find user: ${err.message}`);
      } else {
        throw new Error(`Failed to find user: ${err}`);
      }
    }
  }

  async deleteUserById(id: string): Promise<IUser | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const user = await this.userRepository.deleteUserById(id);
      if (!user) {
        throw new Error('ID not found');
      }
      return user;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find user: ${err.message}`);
      } else {
        throw new Error(`Failed to find user: ${err}`);
      }
    }
  }

  async updateUserById(id: string, data: IUser): Promise<IUser | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const user = await this.userRepository.updateUserById(id, data);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find users: ${err.message}`);
      } else {
        throw new Error(`Failed to find users: ${err}`);
      }
    }
  }
}
