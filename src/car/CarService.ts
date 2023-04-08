import { ICar } from './CarModel';
import { CarRepository } from './CarRepository';
import { errorMessage } from '../utils/ErrorHandling';
import { isObjectIdOrHexString } from 'mongoose';

export class CarService {
  constructor(private readonly carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  async createCar(car: ICar): Promise<ICar | null> {
    try {
      const newCar = await this.carRepository.createCar(car);
      return newCar;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to create car: ${err.message}`);
      } else {
        throw new Error(`Failed to create car: ${err}`);
      }
    }
  }

  async findAllCars(): Promise<ICar[]> {
    try {
      const car = await this.carRepository.findAllCars();
      return car;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find cars: ${err.message}`);
      } else {
        throw new Error(`Failed to find cars: ${err}`);
      }
    }
  }
  async findCarById(id: string): Promise<ICar | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const car = await this.carRepository.findCarById(id);
      if (!car) {
        throw new Error(`ID not found`);
      }
      return car;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find car: ${err.message}`);
      } else {
        throw new Error(`Failed to find car: ${err}`);
      }
    }
  }

  async deleteCarById(id: string): Promise<ICar | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const car = await this.carRepository.deleteCarById(id);
      if (!car) {
        throw new Error('ID not found');
      }
      return car;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find car: ${err.message}`);
      } else {
        throw new Error(`Failed to find car: ${err}`);
      }
    }
  }

  async updateCarById(id: string, data: ICar): Promise<ICar | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const car = await this.carRepository.updateCarById(id, data);
      if (!car) {
        throw new Error('car not found');
      }
      return car;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find cars: ${err.message}`);
      } else {
        throw new Error(`Failed to find cars: ${err}`);
      }
    }
  }
}
