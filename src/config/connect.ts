import mongoose from "mongoose";

export async function connectDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
}