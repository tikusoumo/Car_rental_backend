import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Car from '../models/Car';
import User from '../models/User';
import Reservation from '../models/Reservation';
import Payment from '../models/Payment';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing collections (optional)
    await Promise.all([
      Car.deleteMany({}),
      User.deleteMany({}),
      Reservation.deleteMany({}),
      Payment.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create dummy users
    const user1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: 'dummyhash123', // Dummy hash; in production use a proper hash!
      phone: '1234567890',
      role: 'customer',
    });

    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      passwordHash: 'dummyhash456',
      phone: '0987654321',
      role: 'customer',
    });

    await user1.save();
    await user2.save();
    console.log('Dummy users created');

    // Create dummy cars
    const car1 = new Car({
      make: 'Toyota',
      carModel: 'Camry',
      rentalPrice: 50,
      availability: true,
      features: ['AC', 'Automatic', 'GPS'],
      location: 'New York',
      images: ['https://dummyimage.com/300x200'],
    });

    const car2 = new Car({
      make: 'Honda',
      carModel: 'Civic',
      rentalPrice: 40,
      availability: true,
      features: ['AC', 'Manual'],
      location: 'Los Angeles',
      images: ['https://dummyimage.com/300x200'],
    });

    await car1.save();
    await car2.save();
    console.log('Dummy cars created');

    // Create dummy reservation for user1 with car1
    const reservation1 = new Reservation({
      userId: user1._id,
      carId: car1._id,
      rentalStart: new Date('2025-03-01'),
      rentalEnd: new Date('2025-03-05'),
      status: 'confirmed',
    });

    await reservation1.save();
    console.log('Dummy reservation created');

    // Create dummy payment for the above reservation
    const payment1 = new Payment({
      reservationId: reservation1._id,
      userId: user1._id,
      amount: 200,
      paymentStatus: 'successful',
      transactionId: 'txn_123456789',
    });

    await payment1.save();
    console.log('Dummy payment created');

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
