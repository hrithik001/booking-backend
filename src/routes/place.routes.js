import express from 'express';
import {uploadByLink} from '../controllers/upload.controller.js'
import { addNewPlace ,getAllPlaces ,getSinglePlace, updatePlaceData} from '../controllers/place.controller.js';


const placeRoutes = express.Router();



placeRoutes.get('/',getAllPlaces);
placeRoutes.get('/:id',getSinglePlace);
placeRoutes.post('/upload/by-link',uploadByLink);
placeRoutes.post('/',addNewPlace);
placeRoutes.put('/:id',updatePlaceData);
// placeRoutes.post('/upload/by-file',photoUploadMiddleware,uploadByFile);

export default placeRoutes;
