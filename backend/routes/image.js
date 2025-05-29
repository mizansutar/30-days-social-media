const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/Image_controller');

const upload = multer();

// Ensure the field name matches the frontend ("file")
const router = express.Router();
router.post('/upload', upload.single('file'), imageController.uploadImage);
router.get('/:id', imageController.getImage);

module.exports = router;
