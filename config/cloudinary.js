const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Check if file is PDF
        const isPDF = file.mimetype === 'application/pdf';
        
        if (isPDF) {
            // For PDFs: use 'raw' resource type with no transformations
            return {
                folder: 'portfolio',
                allowed_formats: ['pdf'],
                resource_type: 'raw',
                // No transformations for PDFs
                transformation: undefined,
                flags: undefined
            };
        } else {
            // For images: use 'image' resource type with transformations
            return {
                folder: 'portfolio',
                allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
                resource_type: 'image',
                transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
            };
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1024 * 1024 // 30MB limit
    }
});

module.exports = { cloudinary, upload };
