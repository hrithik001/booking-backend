import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js'

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(bodyParser.json())



app.use("/register", userRoutes)



export default app; 