import { Router } from 'express';
import { createPayment, paymentWebhook } from '../controllers/paymentController';

const router = Router();

router.post('/', createPayment);
// Endpoint to handle webhooks from the payment gateway
router.post('/webhook', paymentWebhook);

export default router;
