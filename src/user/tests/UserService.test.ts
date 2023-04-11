import User, { IUser } from '../UserModel';
import { UserRepository } from '../UserRepository';
import { UserService } from '../UserService';

jest.mock('../UserRepository');

const userRepository = new UserRepository(User);

const userDTO: IUser = {
  name: 'Teste99',
  cpf: '662.260.930-64',
  birth: new Date('02/03/2000'),
  email: 'testando1234512345@mail.com',
  password: '123456',
  cep: '01001000',
  qualified: 'sim',
} as IUser;

describe('User Service Tests', () => {
  describe('createUser', () => {
    it('should return a user', async () => {
      const userService = new UserService(userRepository);
      jest.spyOn(userRepository, 'createUser').mockResolvedValue(userDTO);
      const user = await userService.createUser(userDTO);
      expect(user).toBeTruthy();
    });
    it('should give an error when the user is not created', async () => {
      const userService = new UserService(userRepository);

      jest.spyOn(userRepository, 'createUser').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      try {
        await userService.createUser(userDTO);
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect.assertions(1);
    });
  });
  describe('countDocuments', () => {
    it('should return a number', async () => {
      const userService = new UserService(userRepository);
      jest.spyOn(userRepository, 'countDocuments').mockResolvedValue(1);
      const totalDocs = await userService.countDocuments(userDTO);
      expect(totalDocs).toBeTruthy();
    });
    it('should give an error when the user is not created', async () => {
      const userService = new UserService(userRepository);

      jest.spyOn(userRepository, 'countDocuments').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      try {
        await userService.countDocuments(userDTO);
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect.assertions(1);
    });
  });

  describe('findAllUsers', () => {
    it('should return a user', async () => {
      const userService = new UserService(userRepository);
      jest.spyOn(userRepository, 'findAllUsers').mockResolvedValue([]);
      const users = await userService.findAllUsers(1, 1, {});
      expect(users).toBeTruthy();
    });
    it('should give an error when the user is not created', async () => {
      const userService = new UserService(userRepository);

      jest.spyOn(userRepository, 'findAllUsers').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      try {
        await userService.findAllUsers(1, 1, {});
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect.assertions(1);
    });
  });
});
