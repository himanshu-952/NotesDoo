const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadNote, getNotes } = require("../controllers/noteController");


router.post("/upload", protect, upload.single("pdf"), uploadNote);

 
router.get("/", getNotes);

module.exports = router;
