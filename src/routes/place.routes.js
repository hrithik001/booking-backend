import express from 'express';
import {uploadByLink} from '../controllers/upload.controller.js'
import { addNewPlace } from '../controllers/place.controller.js';


const placeRoutes = express.Router();




placeRoutes.post('/upload/by-link',uploadByLink);
placeRoutes.post('/upload/new',addNewPlace);
// placeRoutes.post('/upload/by-file',photoUploadMiddleware,uploadByFile);

export default placeRoutes;
