const express = require('express');
const multer = require('multer');
const vidio = require('../controllers/video');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ensure the field name matches the frontend ("file")
const router = express.Router();

router.get('/:id', vidio.getVideo);

module.exports = router;
