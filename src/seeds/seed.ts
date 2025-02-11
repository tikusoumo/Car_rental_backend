// src/seeds/seed.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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

    // Clear existing data (be careful in production)
    await Promise.all([
      Car.deleteMany({}),
      User.deleteMany({}),
      Reservation.deleteMany({}),
      Payment.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Define password values and hash them once for all users
    const saltRounds = 10;
    const plainPassword = 'password123';
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Create 10 dummy users
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const user = new User({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        passwordHash: hashedPassword,
        phone: `123456789${i}`,
        role: 'customer',
      });
      await user.save();
      users.push(user);
    }
    console.log('10 Dummy users created');

    // Create 10 dummy cars
    const cars = [];
    const carMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
    const carModels = ['Model A', 'Model B', 'Model C', 'Model D', 'Model E'];
    for (let i = 1; i <= 10; i++) {
      const car = new Car({
        make: carMakes[i % carMakes.length],
        carModel: `${carModels[i % carModels.length]} ${i}`,
        rentalPrice: 40 + i, // variation in price
        availability: true,
        features: ['AC', i % 2 === 0 ? 'Automatic' : 'Manual'],
        location: i % 2 === 0 ? 'New York' : 'Los Angeles',
        images: [`https://dummyimage.com/300x200?text=Car+${i}`],
      });
      await car.save();
      cars.push(car);
    }
    console.log('10 Dummy cars created');

    // Create 10 dummy reservations (each reservation associates a user with a random car)
    const reservations = [];
    for (let i = 0; i < 10; i++) {
      const user = users[i];
      // Randomly pick a car from the cars array
      const randomIndex = Math.floor(Math.random() * cars.length);
      const car = cars[randomIndex];

      // Set rental dates: start today and end after (i+1) days
      const rentalStart = new Date();
      const rentalEnd = new Date();
      rentalEnd.setDate(rentalStart.getDate() + (i + 1));

      const reservation = new Reservation({
        userId: user._id,
        carId: car._id,
        rentalStart,
        rentalEnd,
        status: 'confirmed',
      });
      await reservation.save();
      reservations.push(reservation);
    }
    console.log('10 Dummy reservations created');

    // Create 10 dummy payments (one for each reservation)
    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];
      // For demonstration, set a dummy amount; you can calculate based on rentalPrice and rental period
      const payment = new Payment({
        reservationId: reservation._id,
        userId: reservation.userId,
        amount: 100 + i * 10, // dummy amount variation
        paymentStatus: 'successful',
        transactionId: `txn_${i}_${Date.now()}`,
      });
      await payment.save();
    }
    console.log('10 Dummy payments created');

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
