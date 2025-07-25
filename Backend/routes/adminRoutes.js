const express = require("express");
const router = express.Router();
const { deleteNote, getNotes } = require("../controllers/noteController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.delete("/delete/:id", protect, isAdmin, deleteNote);
router.get("/notes", protect, isAdmin, getNotes);

module.exports = router;
