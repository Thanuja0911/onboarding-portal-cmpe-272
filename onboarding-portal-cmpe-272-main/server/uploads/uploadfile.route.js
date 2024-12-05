import express from "express";
import multer from "multer";
import Document from "./uploadfilesmodel.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload a document
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { filename } = req.file;
    const fileUrl = `http://localhost:3000/files/${filename}`;

    // Save file details in MongoDB
    const document = new Document({ fileName: filename, fileUrl });
    const savedDocument = await document.save();

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Failed to upload document." });
  }
});

// Get all documents
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
});

export default router;
