import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

const __dirname = 'D:/my_playground/booking app/api'



const app = express()

// const corsOptions = {
//   origin: 'https://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//    origin: 'http://localhost:5173',
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };
// const corsOptions = {
//     origin: 'https://booking-frontend-beige.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     allowedHeaders: ['Content-Type', 'Authorization'],
//      credentials: true
// };

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        callback(null, true); // Allow all origins
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))



// routes

import userRoutes from './routes/user.routes.js'
import placeRoutes from './routes/place.routes.js'
import uploadPicture from './routes/upload.routes.js'


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