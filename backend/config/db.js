const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("❌ MONGO_URI environment variable is not set!");
      console.error("All env vars:", Object.keys(process.env).sort());
      console.error("MONGO vars:", Object.keys(process.env).filter(k => k.includes('MONGO')));
      console.error("RAILWAY vars:", Object.keys(process.env).filter(k => k.includes('RAILWAY')));
      process.exit(1);
    }
    console.log("🔍 MONGO_URI found, connecting...");
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
