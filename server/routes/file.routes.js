const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');

// List all files
router.get('/list', fileController.listFiles);

// Upload a file
router.post('/upload', fileController.upload.single('file'), fileController.uploadFile);

// Get a file
router.get('/:key', fileController.getFile);

// Delete a file
router.delete('/:key', fileController.deleteFile);

module.exports = router;
