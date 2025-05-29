const express = require('express');
const multer = require('multer');
const imageController = require('');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ensure the field name matches the frontend ("file")
const router = express.Router();
router.post('/video/upload', upload.single('file'), videoController.uploadVideo);
router.get('/video/:id', videoController.getVideo);

module.exports = router;
