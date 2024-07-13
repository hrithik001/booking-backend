import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './db/index.js';
import dotenv from 'dotenv'
import User from './models/user.model.js';
import bcrypt from 'bcryptjs'


const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

dotenv.config({
    path: './env'
})



app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


// connection establishment of mongoose
connectDB()
.then(() => {
    app.listen(process.env.PORT , () =>
    {
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("DATABASE connection FAiled",error);
})

app.use(bodyParser.json())


app.post('/register',async (req,res) => {
    const {name,email,password} = req.body;
    const user =  await User.create({
                            name,
                            email,
                            password:bcrypt.hashSync(password,bcryptSalt),
                        })
    res.json(
       user
    );
})

