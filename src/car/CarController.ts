import { ICar } from './CarModel';
import { Request, Response } from 'express';
import { CarService } from './CarService';
import { errorHandler } from '../utils/ErrorHandling';
import { ICarQueryParams } from './CarRepository';

export class CarController {
  constructor(private readonly carService: CarService) {
    this.carService = carService;
  }

  createCar = async (req: Request, res: Response): Promise<Response> => {
    try {
      const car: ICar = req.body;
      const newCar = await this.carService.createCar(car);
      return res.status(201).json(newCar);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  findAllCars = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const params: ICarQueryParams = req.query;
      const totalDocs = await this.carService.countDocuments(params);
      const car = await this.carService.findAllCars(page, limit, params);
      if (car.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'No cars found',
        });
      }
      return res.status(200).json({
        cars: car,
        total: totalDocs,
        limit: limit,
        offset: page,
        offsets: Math.ceil(totalDocs / limit),
      });
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  findCarById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const car = await this.carService.findCarById(id);
      return res.status(200).json(car);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  deleteCarById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.carService.deleteCarById(id);
      return res.status(204).json(null);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  updateCarById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const data: ICar = req.body;
      const car = await this.carService.updateCarById(id, data);
      return res.status(200).json({
        status: 'success',
        message: 'car updated',
        car,
      });
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };
}
