import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

// Single Image Upload
router.post("/", (req, res) => {

  upload.single("image")(req, res, (err) => {

    if (err) {

      return res.status(400).json({
        success: false,
        message: err.message
      });

    }

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No image selected."
      });

    }

    const imageUrl =
      `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: "Image uploaded successfully.",
      filename: req.file.filename,
      url: imageUrl
    });

  });

});

export default router;
