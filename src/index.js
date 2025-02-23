import app from './app.js'
import connectDB from './db/index.js';
import dotenv from 'dotenv'

// import dotenv from 'dotenv';
dotenv.config();

// dotenv.config({
//     path: './env'
// })


connectDB()
.then(() => {
    app.listen(process.env.PORT , () =>
    {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})
