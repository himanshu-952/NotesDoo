const Note = require("../models/Note");
const User = require("../models/User");
const cloudinary = require("../cloudinary");
const DatauriParser = require("datauri/parser");
const path = require("path");

const parser = new DatauriParser();

const uploadNote = async (req, res) => {
  const { noteClass, subject, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "PDF file is required" });
  }

  try {
    const file64 = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

   const result = await cloudinary.uploader.upload(file64.content, {
  folder: "notesdoo",
  resource_type: "raw", 
  public_id: path.parse(req.file.originalname).name+".pdf" 
});


    const newNote = await Note.create({
      noteClass,
      subject,
      description,
      fileUrl: result.secure_url,
      uploadedBy: req.user._id,
    });

    res.status(201).json({ msg: "Note uploaded", note: newNote });
  } catch (err) {
    console.error(err);
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
