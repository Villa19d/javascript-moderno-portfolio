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
        console.error(`Error de conexion a MongoDB: ${error.message}`);
        // No usamos process.exit(1) en Vercel para evitar FUNCTION_INVOCATION_FAILED
    }
}

export default connectDB;
