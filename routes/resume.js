const express = require('express');
const router = express.Router();
const axios = require('axios');
const Profile = require('../models/Profile');

// View resume - serves PDF inline for browser viewing
router.get('/view', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        
        if (!profile || !profile.resume?.url) {
            return res.status(404).send('Resume not found');
        }

        // Fetch PDF from Cloudinary
        const response = await axios.get(profile.resume.url, {
            responseType: 'arraybuffer'
        });

        // Set headers for inline viewing
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="Samarth_Jadhav_Resume.pdf"');
        res.send(response.data);
    } catch (error) {
        console.error('Error serving resume:', error);
        res.status(500).send('Error loading resume');
    }
});

// Download resume - forces download
router.get('/download', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        
        if (!profile || !profile.resume?.url) {
            return res.status(404).send('Resume not found');
        }

        // Fetch PDF from Cloudinary
        const response = await axios.get(profile.resume.url, {
            responseType: 'arraybuffer'
        });

        // Set headers for download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Samarth_Jadhav_Resume.pdf"');
        res.send(response.data);
    } catch (error) {
        console.error('Error downloading resume:', error);
        res.status(500).send('Error downloading resume');
    }
});

module.exports = router;
