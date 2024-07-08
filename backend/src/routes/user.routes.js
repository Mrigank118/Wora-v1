import express from 'express';
import { createUser, loginUser, getUserById } from '../controllers/user.controller.js';

const userRouter = express.Router();

// POST /WORA/user - Create User Endpoint
userRouter.post('/', createUser);

// POST /WORA/login - Login Endpoint
userRouter.post('/login', loginUser);

// GET /WORA/user/:id - Get User by ID Endpoint
userRouter.get('/:id', getUserById);

export default userRouter;
