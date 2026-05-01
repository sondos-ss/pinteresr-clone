import mongoose from "mongoose";
import { string } from "zod";

const photoSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Photo", photoSchema);