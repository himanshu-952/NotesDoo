
const express = require("express");
const router = express.Router();
const { deleteNote } = require("../controllers/noteController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {  getNotes } = require("../controllers/noteController");

router.delete("/delete/:id", protect, isAdmin, deleteNote);
router.get("/notes" ,protect, isAdmin, getNotes)

module.exports = router;
