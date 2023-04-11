/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { CarController } from '../CarController';
import { CarService } from '../CarService';
import { CarRepository } from '../CarRepository';
import Car from '../CarModel';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';

jest.mock('../CarRepository');

const carRepository = new CarRepository(Car);
const carService = new CarService(carRepository);
const carController = new CarController(carService);

describe('Car Controller Tests', () => {
  let req: MockRequest<Request>;
  let res: MockResponse<Response>;

  beforeEach(() => {
    req = createRequest();
    res = createResponse();
  });

  describe('creteCar', () => {
    it('should return 201', async () => {
      req = createRequest({
        method: 'POST',
        url: '/api/v1/car',
      });
      req.body = {
        model: 'Fusca',
        color: 'white',
        year: '1962',
        value_per_day: 8,
        accessories: [
          {
            description: '4 ports',
          },
          {
            description: 'test',
          },
        ],
        number_of_passengers: 4,
      };

      await carController.createCar(req, res);
      expect(res.statusCode).toBe(201);
    });

    it('should return 400 when request is incomplete', async () => {
      req = createRequest({
        method: 'POST',
        url: '/api/v1/car',
      });

      req.body = {
        model: 'Fusca',
      };

      jest.spyOn(carService, 'createCar').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      await carController.createCar(req, res);
      expect(res.statusCode).toBe(400);
    });
  });
  describe('findAllCars', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/car',
      });

      //@ts-ignore
      jest.spyOn(carService, 'findAllCars').mockImplementation(() => {
        return [
          {
            model: 'Fusca',
          },
        ];
      });

      await carController.findAllCars(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('should return 400 when an unexpected error occurs', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/car',
      });

      //@ts-ignore
      jest.spyOn(carService, 'findAllCars').mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      await carController.findAllCars(req, res);
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 when no cars are found', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/car',
      });

      //@ts-ignore
      jest.spyOn(carService, 'findAllCars').mockImplementation(() => {
        return [];
      });

      await carController.findAllCars(req, res);
      expect(res.statusCode).toBe(404);
    });
  });
  describe('findCarById', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/car/1',
      });

      //@ts-ignore
      jest.spyOn(carService, 'findCarById').mockImplementation(() => {
        return {
          model: 'Fusca',
        };
      });

      await carController.findCarById(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('should return 404 when no car is found', async () => {
      req = createRequest({
        method: 'GET',
        url: '/api/v1/car/1',
      });

      jest.spyOn(carService, 'findCarById').mockImplementation(() => {
        throw new Error('ID not found');
      });

      await carController.findCarById(req, res);
      expect(res.statusCode).toBe(404);
    });
  });
  describe('deleteCarById', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'DELETE',
        url: '/api/v1/car/1',
      });

      //@ts-ignore
      jest.spyOn(carService, 'deleteCarById').mockImplementation(() => {
        return {
          model: 'Fusca',
        };
      });

      await carController.deleteCarById(req, res);
      expect(res.statusCode).toBe(204);
    });
    it('should return 404 when no car is found', async () => {
      req = createRequest({
        method: 'DELETE',
        url: '/api/v1/car/1',
      });

      jest.spyOn(carService, 'deleteCarById').mockImplementation(() => {
        throw new Error('ID not found');
      });

      await carController.deleteCarById(req, res);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('updateCarById', () => {
    it('should return 200', async () => {
      req = createRequest({
        method: 'PUT',
        url: '/api/v1/car/1',
      });

      req.body = {
        model: 'Fusca',
        color: 'white',
        year: '1962',
        value_per_day: 8,
        accessories: [
          {
            description: '4 ports',
          },
          {
            description: 'test',
          },
        ],
        number_of_passengers: 4,
      };

      //@ts-ignore
      jest.spyOn(carService, 'updateCarById').mockImplementation(() => {
        return {
          model: 'Fusca',
        };
      });

      await carController.updateCarById(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('should return 400 when request is incomplete', async () => {
      req = createRequest({
        method: 'PUT',
        url: '/api/v1/car/1',
      });

      req.body = {
        model: 'Fusca',
      };

      jest.spyOn(carService, 'updateCarById').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      await carController.updateCarById(req, res);
      expect(res.statusCode).toBe(400);
    });
  });
});
