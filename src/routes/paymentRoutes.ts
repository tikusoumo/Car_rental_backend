import { Router } from 'express';
import { createPayment, getAllPayments, paymentWebhook } from '../controllers/paymentController';

const router = Router();

// get all payment
router.get('/', getAllPayments);

router.post('/', createPayment);
// Endpoint to handle webhooks from the payment gateway
router.post('/webhook', paymentWebhook);

export default router;
