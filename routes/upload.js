const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/cloudinary');

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
            let fileUrl = req.file.path;
            
            // For PDFs uploaded as 'raw', modify URL to allow inline viewing
            // Cloudinary raw files are served with Content-Disposition: attachment by default
            // We need to use a workaround: convert the URL to use fl_attachment flag control
            if (req.file.mimetype === 'application/pdf') {
                // The URL will be used for viewing - no attachment flag
                // For downloads, we'll add fl_attachment in the frontend
                console.log('📄 PDF uploaded:', fileUrl);
            }
            
            res.json({
                success: true,
                message: 'File uploaded successfully',
                url: fileUrl, // Cloudinary URL
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
