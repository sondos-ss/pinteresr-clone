import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import authRoutes from "./routes/auth";
import photoRoutes from "./routes/photos";
import { connectDB } from "./config/connect";
import path from "path";
import dns from "dns";
import { errorHandler } from './middlewares/errorhandler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
connectDB(process.env.MONGO_URI || "");

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/photos", photoRoutes);
app.use(errorHandler); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
