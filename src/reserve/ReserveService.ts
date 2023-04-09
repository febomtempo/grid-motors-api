import { IReserve } from './ReserveModel';
import { ReserveRepository } from './ReserveRepository';
import { CarRepository } from '../car/CarRepository';
import { errorMessage } from '../utils/ErrorHandling';
import { isObjectIdOrHexString } from 'mongoose';
import { daysCounter } from '../utils/DaysCounter';

export class ReserveService {
  constructor(
    private readonly reserveRepository: ReserveRepository,
    private readonly carRepository: CarRepository
  ) {
    this.reserveRepository = reserveRepository;
    this.carRepository = carRepository;
  }

  async createReserve(
    reserve: IReserve,
    id_car: string,
    start_date: string,
    end_date: string
  ): Promise<IReserve | null> {
    try {
      if (!isObjectIdOrHexString(id_car)) {
        throw new Error('Invalid ID');
      }
      const car = await this.carRepository.findCarById(id_car);
      if (!car) {
        throw new Error(`Car ID not found`);
      }
      const days = daysCounter(end_date, start_date);
      const carValue = car.value_per_day;
      const final_value = days * carValue;
      reserve.final_value = final_value;
      const newReserve = await this.reserveRepository.createReserve(reserve);
      return newReserve;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to create reserve: ${err.message}`);
      } else {
        throw new Error(`Failed to create reserve: ${err}`);
      }
    }
  }

  async findAllReserves(): Promise<IReserve[]> {
    try {
      const reserve = await this.reserveRepository.findAllReserves();
      return reserve;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find reserves: ${err.message}`);
      } else {
        throw new Error(`Failed to find reserves: ${err}`);
      }
    }
  }
  async findReserveById(id: string): Promise<IReserve | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const reserve = await this.reserveRepository.findReserveById(id);
      if (!reserve) {
        throw new Error(`ID not found`);
      }
      return reserve;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find reserve: ${err.message}`);
      } else {
        throw new Error(`Failed to find reserve: ${err}`);
      }
    }
  }

  async deleteReserveById(id: string): Promise<IReserve | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const reserve = await this.reserveRepository.deleteReserveById(id);
      if (!reserve) {
        throw new Error('ID not found');
      }
      return reserve;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find reserve: ${err.message}`);
      } else {
        throw new Error(`Failed to find reserve: ${err}`);
      }
    }
  }

  async updateReserveById(
    id: string,
    data: IReserve
  ): Promise<IReserve | null> {
    try {
      if (!isObjectIdOrHexString(id)) {
        throw new Error('Invalid ID');
      }
      const reserve = await this.reserveRepository.updateReserveById(id, data);
      if (!reserve) {
        throw new Error('reserve not found');
      }
      return reserve;
    } catch (err: unknown) {
      if (errorMessage(err)) {
        throw new Error(`Failed to find reserves: ${err.message}`);
      } else {
        throw new Error(`Failed to find reserves: ${err}`);
      }
    }
  }
}
