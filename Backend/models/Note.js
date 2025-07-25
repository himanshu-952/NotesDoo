
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  noteClass: {
    type: String,
    enum: ["10", "11", "12", "CSE" , "Neet" , "JEE"],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: String,
  fileUrl: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
 
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
