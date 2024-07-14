import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

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

app.use("/users", userRoutes)
app.use("/place",placeRoutes)

// app.use("/login
// /users/login 

export default app; 