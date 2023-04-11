import Car, { ICar } from '../CarModel';
import { CarRepository } from '../CarRepository';
import { CarService } from '../CarService';

jest.mock('../CarRepository');

const carRepository = new CarRepository(Car);

const carDTO: ICar = {
  model: 'Fusca',
  color: 'white',
  year: '1962',
  value_per_day: 8,
  accessories: ['4 ports'],
  number_of_passengers: 4,
} as ICar;

describe('Car Service Tests', () => {
  describe('createCar', () => {
    it('should return a car', async () => {
      const carService = new CarService(carRepository);
      jest.spyOn(carRepository, 'createCar').mockResolvedValue(carDTO);
      const car = await carService.createCar(carDTO);
      expect(car).toBeTruthy();
    });
    it('should give an error when the car is not created', async () => {
      const carService = new CarService(carRepository);

      jest.spyOn(carRepository, 'createCar').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      try {
        await carService.createCar(carDTO);
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect.assertions(1);
    });
  });
  describe('countDocuments', () => {
    it('should return a number', async () => {
      const carService = new CarService(carRepository);
      jest.spyOn(carRepository, 'countDocuments').mockResolvedValue(1);
      const totalDocs = await carService.countDocuments(carDTO);
      expect(totalDocs).toBeTruthy();
    });
    it('should give an error when the car is not created', async () => {
      const carService = new CarService(carRepository);

      jest.spyOn(carRepository, 'countDocuments').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      try {
        await carService.countDocuments(carDTO);
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect.assertions(1);
    });
  });

  describe('findAllCars', () => {
    it('should return a car', async () => {
      const carService = new CarService(carRepository);
      jest.spyOn(carRepository, 'findAllCars').mockResolvedValue([]);
      const cars = await carService.findAllCars(1, 1, {});
      expect(cars).toBeTruthy();
    });
    it('should give an error when the car is not created', async () => {
      const carService = new CarService(carRepository);

      jest.spyOn(carRepository, 'findAllCars').mockImplementation(() => {
        throw new Error('Request is incomplete');
      });

      try {
        await carService.findAllCars(1, 1, {});
      } catch (error) {
        expect(error).toBeTruthy();
      }

      expect.assertions(1);
    });
  });
});
