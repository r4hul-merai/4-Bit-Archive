const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');

// Upload medicine image and process with OCR
router.post('/image', upload.single('image'), uploadController.uploadImage);

module.exports = router;
