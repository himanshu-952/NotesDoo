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
    // Convert file buffer to base64 with full MIME prefix
    const file64 = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    // 👇 Add MIME prefix manually
    const pdfBase64 = `data:application/pdf;base64,${file64.content.split(",")[1]}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(pdfBase64, {
      folder: "notesdoo",
      resource_type: "raw",
      public_id: path.parse(req.file.originalname).name + ".pdf"
    });

    // Save note in MongoDB
    const newNote = await Note.create({
      noteClass,
      subject,
      description,
      fileUrl: result.secure_url,
      uploadedBy: req.user._id
    });

    res.status(201).json({ msg: "Note uploaded", note: newNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
