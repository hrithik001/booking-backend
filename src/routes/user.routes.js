import express from 'express';
import { registerUser,loginUser, userProfile ,userLogout} from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser)
userRoutes.get('/profile',userProfile);
userRoutes.post('/logout',userLogout);

export default userRoutes;
