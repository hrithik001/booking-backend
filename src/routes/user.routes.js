import express from 'express';
import { registerUser,loginUser, userProfile ,userLogout} from '../controllers/user.controller.js';
import { getUserPlaces,getBookings,getBookingDetails } from '../controllers/place.controller.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser)
userRoutes.get('/profile',userProfile);
userRoutes.post('/logout',userLogout);
userRoutes.get('/places',getUserPlaces)
userRoutes.get('/bookings',getBookings);
userRoutes.get('/bookings/:id',getBookingDetails);


export default userRoutes;
