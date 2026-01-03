const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// File filter to accept only images and PDFs
const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        'image/jpeg': true,
        'image/jpg': true,
        'image/png': true,
        'image/gif': true,
        'image/webp': true,
        'image/svg+xml': true,
        'application/pdf': true
    };

    if (allowedTypes[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP, SVG) and PDF files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit (MongoDB has 16MB document limit)
    }
});

// Upload endpoint - returns Base64 encoded data
router.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'File too large. Maximum size is 10MB.'
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

            // Convert buffer to Base64
            const base64Data = req.file.buffer.toString('base64');
            const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`;
            
            res.json({
                success: true,
                message: 'File uploaded successfully',
                data: base64Data,
                dataUrl: dataUrl,
                contentType: req.file.mimetype,
                originalName: req.file.originalname,
                size: req.file.size
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
