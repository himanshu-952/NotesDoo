const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve static PDF files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
}).catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});
