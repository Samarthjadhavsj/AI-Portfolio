const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('../models/Profile');

async function updateProfileImage() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // The latest uploaded image
        const imageFilename = 'linkdin profile-1767375061266-20700180.jpg';
        const imageUrl = `http://localhost:3000/uploads/${encodeURIComponent(imageFilename)}`;

        await Profile.updateOne({}, {
            profileImage: { url: imageUrl }
        });

        console.log('✅ Profile image URL updated!');
        console.log('New URL:', imageUrl);

        const updated = await Profile.findOne();
        console.log('\n✅ Verified in database');
        console.log('Current profile image URL:', updated.profileImage?.url);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

updateProfileImage();
