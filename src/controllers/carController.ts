import { Request, Response } from 'express';
import Car, { ICar } from '../models/car';

export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars: ICar[] = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car: ICar | null = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const newCar: ICar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: 'Error creating car', error });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const updatedCar: ICar | null = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: 'Error updating car', error });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const deletedCar: ICar | null = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
