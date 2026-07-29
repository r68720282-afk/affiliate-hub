import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadCSV } from "../controllers/csvImportController.js";

const router = express.Router();

// Upload folder
const uploadDir = "server/uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `products-${Date.now()}${ext}`
    );
  }
});

// CSV Filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "text/csv" ||
    file.originalname.toLowerCase().endsWith(".csv")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter
});

// Route

router.post(
  "/upload",
  upload.single("csv"),
  uploadCSV
);

export default router;
