import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

const connectionString = process.env.DATABASE_CONNECTION

  const connectDB = async() => {
     
    try {
        await mongoose.connect(connectionString)
        console.log('MongoDB connected successfully')

    } catch (error) {
        console.log('MongoDB failed to connect')
        console.log(error)
        process.exit(1)
    }
}

export default connectDB 