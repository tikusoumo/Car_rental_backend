import { RequestHandler } from 'express';
import Reservation, { IReservation } from '../models/Reservation';

export const getReservations: RequestHandler = async (req, res, next) => {
  try {
    const reservations: IReservation[] = await Reservation.find();
    res.json(reservations);
    return;
  } catch (error) {
    return next(error);
  }
};
export const getReservationById: RequestHandler = async (req, res, next) => {
  try {
    const reservation: IReservation | null = await Reservation.findById(req.params.id);
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(reservation);
    return;
  } catch (error) {
    return next(error);
  }
};
export const createReservation: RequestHandler = async (req, res, next) => {
  try {
    const newReservation: IReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
    return;
  } catch (error) {
    return next(error);
  }
};
export const updateReservationStatus: RequestHandler = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedReservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(updatedReservation);
    return;
  } catch (error) {
    return next(error);
  }
};

