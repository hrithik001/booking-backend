

import  { CloudinaryStorage } from 'multer-storage-cloudinary';
import  multer from 'multer';
import path from 'path'; 
import  { Cloudinary as cloudinary} from '../utils/cloudnary.utils.js'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'booking_backend'
    }
});

const storageForFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
const uploadForFiles = multer({ storage: storageForFiles });

export {upload,uploadForFiles}