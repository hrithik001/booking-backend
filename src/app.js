import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(bodyParser.json())
app.use(cookieParser())



// routes

import userRoutes from './routes/user.routes.js'

app.use("/users", userRoutes)

// app.use("/login
// /users/login 

export default app; 