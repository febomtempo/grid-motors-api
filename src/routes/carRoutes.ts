import express, { Router } from 'express';
import { CarController } from '../car/CarController';
import Car from '../car/CarModel';
import { CarService } from '../car/CarService';
import { CarRepository } from '../car/CarRepository';
import { protect } from '../auth/AuthController';

const carRepository = new CarRepository(Car);
const carService = new CarService(carRepository);
const carController = new CarController(carService);

const carRoutes: Router = express.Router();

carRoutes.post('/', protect, carController.createCar);
carRoutes.get('/', carController.findAllCars);
carRoutes.get('/:id', protect, carController.findCarById);
carRoutes.delete('/:id', protect, carController.deleteCarById);
carRoutes.put('/:id', protect, carController.updateCarById);

export default carRoutes;
