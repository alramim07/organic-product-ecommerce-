import mongoose from "mongoose";

let isMemoryServer = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ammwala_db";

  try {
    // Attempt connecting to the configured MongoDB URI (Atlas or Local)
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`⚠️ Could not connect to primary MongoDB at ${uri}. Reason: ${err.message}`);
    console.log(`🔄 Launching embedded Zero-Config Database Fallback...`);

    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      isMemoryServer = true;

      const conn = await mongoose.connect(memoryUri);
      console.log(`🚀 Embedded In-Memory MongoDB Engine started at: ${memoryUri}`);
      console.log(`💡 Note: To use MongoDB Atlas cloud permanently, set MONGO_URI in backend/.env`);
      return conn;
    } catch (memErr) {
      console.error(`❌ Critical Database Error: ${memErr.message}`);
      throw memErr;
    }
  }
};
