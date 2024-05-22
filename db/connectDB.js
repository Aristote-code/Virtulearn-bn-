import mongoose, { mongo } from "mongoose";
import { MONGO_DB_URL } from '../jwt/Api.js';

export async function connectDB() {
  const dbUrl = MONGO_DB_URL;
  try {
    await mongoose.connect(dbUrl);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Connection Error", error);
  }
}
