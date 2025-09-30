import mongoose from "mongoose";

let isConnected = false; // Track the connection

export async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: process.env.DB_NAME || "next_auth_db",
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw new Error("Database connection failed");
  }
}
