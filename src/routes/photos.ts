import express from "express";
import multer from "multer";
import path from "path";
import Photo from "../models/photo";
import { requireAuth } from "../middlewares/authMiddleware";
import { AppError } from "../middlewares/errorhandler";

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", requireAuth,upload.single("photo"),
  async (req, res, next) => {
    try {
      if (!req.file) throw new AppError("No file uploaded", 400);
      if (!req.session.userId) throw new AppError("User not authenticated", 401);
      const photo = await Photo.create({
        filename: req.file.filename,
        uploader: req.session.userId,
      });
      res.json(photo);
    } catch (err) {
      next(err);
    }
  },
);
router.get("/", async (req, res, next) => {
  try {
    const photos = await Photo.find().populate('uploader', 'email');
    res.json(photos);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('uploader', 'email');
    if (!photo) throw new AppError('Photo not found', 404);
    res.json(photo);
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) throw new AppError('Photo not exist', 404);
    if (photo.uploader.toString() !== req.session.userId) {
      throw new AppError('You are not allowed to delete this photo', 403);
    }
    await photo.deleteOne();
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;




