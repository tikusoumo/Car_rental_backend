// src/routes/userRoutes.ts
import { Router } from 'express';
import { registerUser,getAllUsers } from '../controllers/userController';

const router = Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to get all users
router.get('/', getAllUsers);

export default router;
