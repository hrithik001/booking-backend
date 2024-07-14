import express from 'express';
import { registerUser,loginUser, userProfile } from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser)
userRoutes.get('/profile',userProfile);

export default userRoutes;
