import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
};

export default connectDB;
