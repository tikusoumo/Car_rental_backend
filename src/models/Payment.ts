import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  reservationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  paymentStatus: 'initiated' | 'successful' | 'failed';
  transactionId?: string;
}

const PaymentSchema: Schema = new Schema(
  {
    reservationId: { type: Schema.Types.ObjectId, ref: 'Reservation', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['initiated', 'successful', 'failed'],
      default: 'initiated'
    },
    transactionId: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IPayment>('Payment', PaymentSchema);
