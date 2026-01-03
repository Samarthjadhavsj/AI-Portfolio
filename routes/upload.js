const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

// Upload endpoint - uses Cloudinary
router.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'File too large. Maximum size is 30MB.'
                });
            }
            
            return res.status(400).json({
                success: false,
                message: err.message || 'Failed to upload file'
            });
        }

        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
            }

            // Cloudinary automatically uploads and returns URL
            res.json({
                success: true,
                message: 'File uploaded successfully',
                url: req.file.path, // Cloudinary URL
                publicId: req.file.filename, // Cloudinary public ID
                originalName: req.file.originalname,
                size: req.file.size,
                contentType: req.file.mimetype
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to upload file',
                error: error.message
            });
        }
    });
});

module.exports = router;
