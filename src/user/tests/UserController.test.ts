/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { UserController } from '../UserController';
import { UserService } from '../UserService';
import { UserRepository } from '../UserRepository';
import User from '../UserModel';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';

jest.mock('../UserRepository');

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

describe('User Controller Tests', () => {
  let req: MockRequest<Request>;
  let res: MockResponse<Response>;

  beforeEach(() => {
    req = createRequest();
    res = createResponse();
  });

  describe('create User', () => {
    it('should return 201', async () => {
      req = createRequest({
        method: 'POST',
        url: '/api/v1/user',
      });
      req.body = {
        name: 'Teste99',
        cpf: '662.260.930-64',
        birth: '02/03/2000',
        email: 'testando1234512345@mail.com',
        password: '123456',
        cep: '01001000',
        qualified: 'sim',
      };

      await userController.createUser(req, res);
      expect(res.statusCode).toBe(201);
    });

    it('should return 400 when request is incomplete', async () => {
      req = createRequest({
        method: 'POST',
        url: '/api/v1/user',
      });

      req.body = {
        name: 'Teste99',
      };

      jest.spyOn(userService, 'createUser').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      await userController.createUser(req, res);
      expect(res.statusCode).toBe(400);
    });
  });
  describe('findAllUsers', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/user',
      });

      //@ts-ignore
      jest.spyOn(userService, 'findAllUsers').mockImplementation(() => {
        return [
          {
            name: 'Teste99',
          },
        ];
      });

      await userController.findAllUsers(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('should return 400 when an unexpected error occurs', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/user',
      });

      //@ts-ignore
      jest.spyOn(userService, 'findAllUsers').mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      await userController.findAllUsers(req, res);
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 when no users are found', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/user',
      });

      //@ts-ignore
      jest.spyOn(userService, 'findAllUsers').mockImplementation(() => {
        return [];
      });

      await userController.findAllUsers(req, res);
      expect(res.statusCode).toBe(404);
    });
  });
  describe('findUserById', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/user/1',
      });

      //@ts-ignore
      jest.spyOn(userService, 'findUserById').mockImplementation(() => {
        return {
          nae: 'Teste99',
        };
      });

      await userController.findUserById(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('should return 404 when no user is found', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/user/1',
      });

      jest.spyOn(userService, 'findUserById').mockImplementation(() => {
        throw new Error('ID not found');
      });

      await userController.findUserById(req, res);
      expect(res.statusCode).toBe(404);
    });
  });
  describe('deleteUserById', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'DELETE',
        url: '/api/v1/user/1',
      });

      //@ts-ignore
      jest.spyOn(userService, 'deleteUserById').mockImplementation(() => {
        return {
          name: 'Teste99',
        };
      });

      await userController.deleteUserById(req, res);
      expect(res.statusCode).toBe(204);
    });
    it('should return 404 when no user is found', async () => {
      req = createRequest({
        method: 'DELETE',
        url: '/api/v1/user/1',
      });

      jest.spyOn(userService, 'deleteUserById').mockImplementation(() => {
        throw new Error('ID not found');
      });

      await userController.deleteUserById(req, res);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('updateUserById', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'PUT',
        url: '/api/v1/user/1',
      });

      req.body = {
        email: 'testando11142445545451@mail.com',
        cep: '01001000',
        qualified: 'sim',
      };

      //@ts-ignore
      jest.spyOn(userService, 'updateUserById').mockImplementation(() => {
        return {
          name: 'Teste99',
        };
      });

      await userController.updateUserById(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('should return 400 when request is incomplete', async () => {
      req = createRequest({
        method: 'PUT',
        url: '/api/v1/user/1',
      });

      req.body = {
        name: 'Teste99',
      };

      jest.spyOn(userService, 'updateUserById').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      await userController.updateUserById(req, res);
      expect(res.statusCode).toBe(400);
    });
  });
});
