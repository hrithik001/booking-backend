import express from 'express';
import {uploadByLink} from '../controllers/upload.controller.js'



const placeRoutes = express.Router();




placeRoutes.post('/upload/by-link',uploadByLink);
// placeRoutes.post('/upload/by-file',photoUploadMiddleware,uploadByFile);

export default placeRoutes;
