import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    isConnected = true;
    console.log(
      "MongoDB connected !! DB HOST:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MONGO db connection failed !!!", error.message);
    throw error;
  }
};

export default connectDB;
