import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const connectDB = async ()=> {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${db.connection.host}`);
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB URL: ${url}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;
