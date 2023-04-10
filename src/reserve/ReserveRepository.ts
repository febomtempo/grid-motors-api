import { Model } from 'mongoose';
import { IReserve } from './ReserveModel';

export class ReserveRepository {
  constructor(private readonly reserveModel: Model<IReserve>) {
    this.reserveModel = reserveModel;
  }

  async createReserve(reserve: IReserve): Promise<IReserve | null> {
    const newReserve = await this.reserveModel.create(reserve);
    return newReserve;
  }

  async countDocuments(): Promise<number> {
    const totalDocs = await this.reserveModel.countDocuments();
    return totalDocs;
  }

  async findAllReserves(page: number, limit: number): Promise<IReserve[]> {
    const skip = (page - 1) * limit;

    const reserve = await this.reserveModel
      .find()
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
