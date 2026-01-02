const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('../models/Profile');

async function fixBioFormatting() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const newBio = `I'm a passionate <span class="text-blue">AI Engineer</span> specializing in <span class="text-purple">machine learning</span>, <span class="text-pink">deep learning</span>, and <span class="text-orange">natural language processing</span>.<br><br>I design and deploy intelligent systems that solve real-world problems using cutting-edge AI technologies.`;

        await Profile.updateOne({}, { 
            bio: newBio
        });

        console.log('✅ Updated bio with better formatting');
        console.log('\nNew bio:');
        console.log(newBio);

        const updated = await Profile.findOne();
        console.log('\n✅ Verified in database');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

fixBioFormatting();
