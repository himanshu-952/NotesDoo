const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");
const { uploadNote } = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Upload note (authenticated user with PDF upload)
router.post("/upload", protect, upload.single("pdf"), uploadNote);



// Auth routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
