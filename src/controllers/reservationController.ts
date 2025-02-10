import { Request, Response } from 'express';
import Reservation, { IReservation } from '../models/Reservation';

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations: IReservation[] = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation: IReservation | null = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const newReservation: IReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating reservation', error });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedReservation: IReservation | null = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation status', error });
  }
};
