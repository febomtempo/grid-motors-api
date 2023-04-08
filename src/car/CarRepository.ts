import { Model } from 'mongoose';
import { ICar } from './CarModel';

export class CarRepository {
  constructor(private readonly carModel: Model<ICar>) {
    this.carModel = carModel;
  }

  async createCar(car: ICar): Promise<ICar | null> {
    const newCar = await this.carModel.create(car);
    return newCar;
  }

  async findAllCars(): Promise<ICar[]> {
    const car = await this.carModel.find().select('-__v');
    return car;
  }

  async findCarById(id: string): Promise<ICar | null> {
    const car = await this.carModel.findById(id).select('-__v');
    return car;
  }

  async deleteCarById(id: string): Promise<ICar | null> {
    const car = await this.carModel.findByIdAndDelete(id);
    return car;
  }

  async updateCarById(id: string, data: ICar): Promise<ICar | null> {
    return this.carModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}
