const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { calculateFileHash } = require('../utils/hash');

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
  const hash = await calculateFileHash(filePath);

  // You can delete the file after hashing, or keep it
  // fs.unlinkSync(filePath);

  res.json({
    fileName: req.file.originalname,
    hash: hash
  });
});

module.exports = router;
