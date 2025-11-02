const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({
      message: "✅ File uploaded successfully",
      imageUrl: req.file.path, // <- this is the Cloudinary URL
    });
  } catch (error) {
    console.error("🔥 Upload error:", error);
    res.status(500).json({
      message: "❌ File upload failed",
      error: error.message,
    });
  }
});

module.exports = router;
