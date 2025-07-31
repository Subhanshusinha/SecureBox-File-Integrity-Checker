// server.js
const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🟢 Place this route here: It handles file uploads and computes hash
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Received file:', req.file); // Debugging line

  // If no file is received
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'File not received' });
  }

  // Calculate SHA-256 hash
  const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
  
  // Send hash as response
  res.json({ hash });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
