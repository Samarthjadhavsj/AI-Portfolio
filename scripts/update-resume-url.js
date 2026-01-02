const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('../models/Profile');

async function updateResumeUrl() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // The uploaded resume filename
        const resumeFilename = 'SAMARTH A JADHAV-AI-ML-1767373683978-507628907.pdf';
        const resumeUrl = `http://localhost:3000/uploads/${encodeURIComponent(resumeFilename)}`;

        await Profile.updateOne({}, {
            resume: { url: resumeUrl }
        });

        console.log('✅ Resume URL updated!');
        console.log('New URL:', resumeUrl);

        const updated = await Profile.findOne();
        console.log('\n✅ Verified in database');
        console.log('Current resume URL:', updated.resume?.url);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

updateResumeUrl();
