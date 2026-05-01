import mongoose from "mongoose";
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type AuthInput = z.infer<typeof authSchema>;
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
export default mongoose.model("User", userSchema);
