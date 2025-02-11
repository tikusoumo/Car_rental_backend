// src/routes/userRoutes.ts
import { Router } from 'express';
import { registerUser } from '../controllers/userController';

const router = Router();

// Route to register a new user
router.post('/register', registerUser);

export default router;
