import { Router } from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus
} from '../controllers/reservationController';

const router = Router();

router.get('/', getReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.put('/:id/status', updateReservationStatus);

export default router;
