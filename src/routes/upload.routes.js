import express from 'express';
import {uploadFiles,uploadByFiles} from "../controllers/upload.controller.js"
import  {upload,uploadForFiles} from '../middlewares/multer.middleware.js'

 const uploadPicture = express.Router();

uploadPicture.post('/by-link', uploadFiles);
uploadPicture.post('/by-file', uploadForFiles.single('photo'), uploadByFiles);

export default uploadPicture;


