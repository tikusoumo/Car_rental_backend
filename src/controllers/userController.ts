// src/controllers/userController.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';

//get all user
export const getAllUsers: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const registerUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    
    // Hash the password before saving
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser: IUser = new User({
      name,
      email,
      passwordHash,
      phone,
      role: role || 'customer'
    });

    const savedUser = await newUser.save();

    // Omit sensitive information before sending back a response
    const userToReturn = { 
      _id: savedUser._id, 
      name: savedUser.name, 
      email: savedUser.email,
      phone: savedUser.phone,
      role: savedUser.role 
    };

    res.status(201).json(userToReturn);
    return;
  } catch (error) {
    next(error);
  }
};
