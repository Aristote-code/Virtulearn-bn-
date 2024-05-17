import mongoose, { mongo } from "mongoose";

export async function connectDB() {
  const dbUrl = process.env.MONGO_DB_URL;
  try {
    await mongoose.connect(dbUrl);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Connection Error", error);
  }
}
