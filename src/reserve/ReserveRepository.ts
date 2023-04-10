import { Model } from 'mongoose';
import { IReserve } from './ReserveModel';

export interface IReserveQueryParams {
  start_date?: Date;
  end_date?: Date;
  id_user?: string;
  id_car?: string;
}

export class ReserveRepository {
  constructor(private readonly reserveModel: Model<IReserve>) {
    this.reserveModel = reserveModel;
  }

  async createReserve(reserve: IReserve): Promise<IReserve | null> {
    const newReserve = await this.reserveModel.create(reserve);
    return newReserve;
  }

  async countDocuments(params: IReserveQueryParams): Promise<number> {
    const totalDocs = await this.reserveModel.countDocuments(params);
    return totalDocs;
  }

  async findAllReserves(
    page: number,
    limit: number,
    params: IReserveQueryParams
  ): Promise<IReserve[]> {
    const skip = (page - 1) * limit;
    const reserve = await this.reserveModel
      .find(params)
      .skip(skip)
      .limit(limit)
      .select('-__v');
    return reserve;
  }

  async findReserveById(id: string): Promise<IReserve | null> {
    const reserve = await this.reserveModel.findById(id).select('-__v');
    return reserve;
  }

  async deleteReserveById(id: string): Promise<IReserve | null> {
    const reserve = await this.reserveModel.findByIdAndDelete(id);
    return reserve;
  }

  async updateReserveById(
    id: string,
    data: IReserve
  ): Promise<IReserve | null> {
    return this.reserveModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}
