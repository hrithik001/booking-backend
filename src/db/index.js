
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"



const connectDB = async () => {
    try {
        
        // console.log(`env data : ${process.env.MONGOOSE_URL}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`);
        

        console.log(`MongoDB Connected! DB : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error",error);
        throw error
        process.exit(1);
    }
}

export default connectDB

