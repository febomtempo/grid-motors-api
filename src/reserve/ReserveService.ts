import Reserve, { IReserve } from './ReserveModel';
import { IReserveQueryParams, ReserveRepository } from './ReserveRepository';
import { CarRepository } from '../car/CarRepository';
import { errorMessage } from '../utils/ErrorHandling';
import { isObjectIdOrHexString } from 'mongoose';
import { daysCounter } from '../utils/DaysCounter';
import User from '../user/UserModel';

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
    id_user: string,
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
      const user = await User.findById(id_user);
      if (user?.qualified !== 'sim') {
        throw new Error('User not qualified for a reservation');
      }
      const days = daysCounter(start_date, end_date);

      const isCarAlreadyReserved = await Reserve.findOne({
        id_car: id_car,
        start_date: { $lt: end_date },
        end_date: { $gt: start_date },
      });

      if (isCarAlreadyReserved) {
        throw new Error(
          'This car has already a reserve between Start Date and End Date'
        );
      }

      const isUserAlreadyReserved = await Reserve.findOne({
        id_user: id_user,
        start_date: { $lt: end_date },
        end_date: { $gt: start_date },
      });
      if (isUserAlreadyReserved) {
        throw new Error(
          'This user has already a reserve between Start Date and End Date'
        );
      }

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

  async countDocuments(params: IReserveQueryParams): Promise<number> {
    const totalDocs = await this.reserveRepository.countDocuments(params);
    return totalDocs;
  }

  async findAllReserves(
    page: number,
    limit: number,
    params: IReserveQueryParams
  ): Promise<IReserve[]> {
    try {
      const reserve = await this.reserveRepository.findAllReserves(
        page,
        limit,
        params
      );
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
