import express, { Router } from 'express';
import { ReserveController } from '../reserve/ReserveController';
import Reserve from '../reserve/ReserveModel';
import { ReserveService } from '../reserve/ReserveService';
import { ReserveRepository } from '../reserve/ReserveRepository';
import { protect } from '../auth/AuthController';
import { CarRepository } from '../car/CarRepository';
import Car from '../car/CarModel';
import { validate } from '../validation/Validator';
import {
  reserveSchema,
  reserveUpdateSchema,
} from '../reserve/ReserveValidation';

const carRepository = new CarRepository(Car);
const reserveRepository = new ReserveRepository(Reserve);
const reserveService = new ReserveService(reserveRepository, carRepository);
const reserveController = new ReserveController(reserveService);

const reserveRoutes: Router = express.Router();

reserveRoutes.post(
  '/',
  protect,
  validate(reserveSchema),
  reserveController.createReserve
);
reserveRoutes.get('/', protect, reserveController.findAllReserves);
reserveRoutes.get('/:id', protect, reserveController.findReserveById);
reserveRoutes.delete('/:id', protect, reserveController.deleteReserveById);
reserveRoutes.put(
  '/:id',
  protect,
  validate(reserveUpdateSchema),
  reserveController.updateReserveById
);

export default reserveRoutes;
