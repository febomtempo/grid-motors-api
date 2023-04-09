import express, { Router } from 'express';
import { ReserveController } from '../reserve/ReserveController';
import Reserve from '../reserve/ReserveModel';
import { ReserveService } from '../reserve/ReserveService';
import { ReserveRepository } from '../reserve/ReserveRepository';
import { protect } from '../auth/AuthController';
import { CarRepository } from '../car/CarRepository';
import Car from '../car/CarModel';

const carRepository = new CarRepository(Car);
const reserveRepository = new ReserveRepository(Reserve);
const reserveService = new ReserveService(reserveRepository, carRepository);
const reserveController = new ReserveController(reserveService);

const reserveRoutes: Router = express.Router();

reserveRoutes.post('/', protect, reserveController.createReserve);
reserveRoutes.get('/', reserveController.findAllReserves);
reserveRoutes.get('/:id', protect, reserveController.findReserveById);
reserveRoutes.delete('/:id', protect, reserveController.deleteReserveById);
reserveRoutes.put('/:id', protect, reserveController.updateReserveById);

export default reserveRoutes;
