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
        
        return {
            folder: 'portfolio',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf'],
            // Use 'image' resource type for PDFs to allow inline viewing
            // Cloudinary treats PDFs as images when uploaded this way
            resource_type: isPDF ? 'image' : 'image',
            // Only apply transformations to actual images, not PDFs
            transformation: isPDF ? undefined : [{ width: 1000, height: 1000, crop: 'limit' }],
            // Don't set any flags - let browser handle display
            flags: undefined
        };
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1024 * 1024 // 30MB limit
    }
});

module.exports = { cloudinary, upload };
