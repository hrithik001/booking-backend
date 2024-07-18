import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import multer from 'multer';
import fs from 'fs'
const __dirname = 'D:/my_playground/booking app/api'



const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads')) // eg: http://localhost:4000/uploads/pic1720979383958.jpg we can see the uploaded image here



// routes

import userRoutes from './routes/user.routes.js'
import placeRoutes from './routes/place.routes.js'
// import adminRoutes from './routes/admin.routes.js'
import uploadPicture from './routes/upload.routes.js'
// import { photoUploadMiddleware } from "./middlewares/photoUpload.middleware.js";

app.use("/users", userRoutes)
app.use("/places",placeRoutes)
app.use("/upload",uploadPicture);
// app.use("/upload",adminRoutes)

// const uploadMiddleware = multer({dest: 'uploads/'});
// app.post('/upload/by-file',uploadMiddleware.array('photos',100), (req,res) => {
//     const upLoadedFiles = [];
//     console.log("request",req.files);
//     for(let i = 0;i < req.files.length ; i++)
//     {
//         const {path , originalname} = req.files[i];
//         const lastDotIndex = originalname.lastIndexOf('.');
//          const ext = originalname.substring(lastDotIndex + 1);
//          console.log("extenstion",ext);

        
//         const newPath = path + '.' + ext;
//         fs.renameSync(path,newPath);
//         upLoadedFiles.push(newPath.replace('uploads\\',''))
//         const {name} = req.files[i];

//         console.log("from here",name);

//     }

//     res.json(upLoadedFiles)

//     console.log(res.files);
// })

// app.use("/login
// /users/login 












export default app; 