import { Request, Response } from 'express';
import Payment, { IPayment } from '../models/Payment';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { reservationId, userId, amount } = req.body;
    const newPayment: IPayment = new Payment({
      reservationId,
      userId,
      amount,
      paymentStatus: 'initiated',
    });
    const savedPayment = await newPayment.save();

    // Simulate payment processing.
    // In a real scenario, create a payment intent with your gateway here.
    savedPayment.paymentStatus = 'successful';
    // Optionally, assign a transactionId returned from the gateway.
    await savedPayment.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: 'Error processing payment', error });
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find({});
    res.json(payments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching payments', error });
  }
};

export const paymentWebhook = async (req: Request, res: Response) => {
  try {
    // Validate and process the webhook payload from your payment gateway.
    console.log('Webhook received:', req.body);
    // Update payment records accordingly.
    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).json({ message: 'Error handling webhook', error });
  }
};
