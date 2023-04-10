import { Model } from 'mongoose';
import { ICar } from './CarModel';

export interface ICarQueryParams {
  model?: string;
  color?: string;
  year?: string;
  value_per_day?: number;
  accessories?: string[];
  number_of_passengers?: number;
}

export class CarRepository {
  constructor(private readonly carModel: Model<ICar>) {
    this.carModel = carModel;
  }

  async createCar(car: ICar): Promise<ICar | null> {
    const newCar = await this.carModel.create(car);
    return newCar;
  }

  async countDocuments(params: ICarQueryParams): Promise<number> {
    const totalDocs = await this.carModel.countDocuments(params);
    return totalDocs;
  }

  async findAllCars(
    page: number,
    limit: number,
    params: ICarQueryParams
  ): Promise<ICar[]> {
    const skip = (page - 1) * limit;
    const car = await this.carModel
      .find()
      .find(params)
      .skip(skip)
      .limit(limit)
      .select('-__v');
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
