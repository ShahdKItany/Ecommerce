import mongoose from "mongoose";
import dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config();

const connectDB = async () => {
  mongoose.connect(process.env.DB)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
  });
}

export default connectDB;
