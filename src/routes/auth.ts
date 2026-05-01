import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { AppError } from "../middlewares/errorhandler";

const router = express.Router();
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const used = await User.findOne({ email });
    if (used) throw new AppError("Email already in use", 400);

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    req.session.userId = user._id.toString();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new AppError("Invalid email or password", 400);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError("Invalid email or password", 400);
    req.session.userId = user._id.toString();
    res.json({ message: "Logged in successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(new AppError("Erorr in logging out", 500));
    res.json({ message: "Logged out" });
  });
});

export default router;
