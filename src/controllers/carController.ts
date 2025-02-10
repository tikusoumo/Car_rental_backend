import { Request, Response, NextFunction, RequestHandler } from 'express';
import Car, { ICar } from '../models/car';

export const getAllCars: RequestHandler = async (req, res, next) => {
  try {
    const cars: ICar[] = await Car.find();
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

export const getCarById: RequestHandler = async (req, res, next) => {
  try {
    const car: ICar | null = await Car.findById(req.params.id);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
};

export const createCar: RequestHandler = async (req, res, next) => {
  try {
    const newCar: ICar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    next(error);
  }
};

export const updateCar: RequestHandler = async (req, res, next) => {
  try {
    const updatedCar: ICar | null = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
};

export const deleteCar: RequestHandler = async (req, res, next) => {
  try {
    const deletedCar: ICar | null = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    next(error);
  }
};
