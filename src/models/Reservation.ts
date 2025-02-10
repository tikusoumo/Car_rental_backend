import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  rentalStart: Date;
  rentalEnd: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const ReservationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    rentalStart: { type: Date, required: true },
    rentalEnd: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
