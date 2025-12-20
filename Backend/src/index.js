// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from './db/index.js';
import app from './app.js'; // ✅ default import

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!", err);
  });
