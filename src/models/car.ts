import mongoose, { Document, Schema } from 'mongoose';

export interface ICar extends Document {
  make: string;
  carModel: string;
  rentalPrice: number;
  availability: boolean;
  features: string[];
  location: string;
  images: string[];
}

const CarSchema: Schema = new Schema({
  make: { type: String, required: true },
  carModel: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  features: [{ type: String }],
  location: { type: String },
  images: [{ type: String }],
});

export default mongoose.model<ICar>('Car', CarSchema);
