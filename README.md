# Car Rental Backend

This project is a backend API for a car rental application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Cars**: Retrieve, create, update, and delete car records.
- **Reservations**: Manage reservations for car rentals.
- **Payments**: Process payments and handle webhooks for payment gateway integration.


## Installation
```bash
npm install
```
Environment Variables:
```bash
MONGO_URI=Your Own database 
PORT=5000
```
Run the Application:
```bash
npm run start
```
API Endpoints
```bash
Cars
GET /api/cars
Retrieve all available cars.

GET /api/cars/:id
Retrieve details of a single car by ID.

POST /api/cars
Add a new car.

PUT /api/cars/:id
Update a car by ID.

DELETE /api/cars/:id
Delete a car by ID.

Reservations
GET /api/reservations
GET /api/reservations/:id
POST /api/reservations
PUT /api/reservations/:id/status
Payments
POST /api/payments
Create a payment.

POST /api/payments/webhook
Endpoint for handling payment gateway webhooks.
```
Seeding Data
To insert seed data into your MongoDB database, run:
```bash
npm run seed
```
This script will clear existing data and insert dummy data for users, cars, reservations, and payments.
