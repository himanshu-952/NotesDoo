const Note = require("../models/Note");
const User = require("../models/User");

// Upload a note 
const uploadNote = async (req, res) => {
  const { noteClass, subject, description } = req.body;

if (!req.file) {
  return res.status(400).json({ msg: "PDF file is required" });
}
console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

try {
  const newNote = await Note.create({ 
    noteClass,       
    subject, 
    description,
    fileUrl: `/uploads/${req.file.filename}`,
    uploadedBy: req.user._id,
  });


    console.log("Note Uploaded", newNote);
    res.status(201).json({ msg: "Note uploaded", note: newNote });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// Get all notes with optional filters
const getNotes = async (req, res) => {
  try {
    const { class: className, subject, username } = req.query;
   console.log("Incoming query:", req.query);

    let query = {};

    if (className) query.noteClass = className;
    if (subject) query.subject = subject;

    if (username) {
      const user = await User.findOne({ name: username });
      if (user) {
        query.uploadedBy = user._id;
      } else {
        return res.status(404).json({ msg: "No notes found for this username" });
      }
    }

    const notes = await Note.find(query).populate("uploadedBy", "name email");
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
};

// Admin delete note by ID
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    await note.deleteOne();
    res.json({ msg: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  uploadNote,
  getNotes,
  deleteNote
};
