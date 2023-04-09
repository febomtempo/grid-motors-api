import { IReserve } from './ReserveModel';
import { Request, Response } from 'express';
import { ReqWithUser } from '../auth/AuthController';
import { ReserveService } from './ReserveService';
import { errorHandler } from '../utils/ErrorHandling';

export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {
    this.reserveService = reserveService;
  }

  createReserve = async (
    req: ReqWithUser,
    res: Response
  ): Promise<Response> => {
    try {
      const reserve: IReserve = req.body;
      const { id_car, start_date, end_date } = reserve;
      reserve.id_user = req.user?.id;
      const newReserve = await this.reserveService.createReserve(
        reserve,
        id_car.toString(),
        start_date.toString(),
        end_date.toString()
      );
      return res.status(201).json(newReserve);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  findAllReserves = async (req: Request, res: Response): Promise<Response> => {
    try {
      const reserve = await this.reserveService.findAllReserves();
      return res.status(200).json(reserve);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  findReserveById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const reserve = await this.reserveService.findReserveById(id);
      return res.status(200).json(reserve);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  deleteReserveById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.reserveService.deleteReserveById(id);
      return res.status(204).json(null);
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };

  updateReserveById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const data: IReserve = req.body;
      const reserve = await this.reserveService.updateReserveById(id, data);
      return res.status(200).json({
        status: 'success',
        message: 'reserve updated',
        reserve,
      });
    } catch (err: unknown) {
      return errorHandler(err, res);
    }
  };
}
