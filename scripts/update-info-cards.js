const mongoose = require('mongoose');
const Profile = require('../models/Profile');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function updateInfoCards() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const profile = await Profile.findOne();
        
        if (profile) {
            // Update Career Aspirations with colored text
            profile.careerAspirations = `Proficient in <span class="text-blue">Python</span> with frameworks like TensorFlow, PyTorch, and Scikit-learn. I've collaborated with teams through hackathons and technical expos to develop AI applications, from predictive analytics to intelligent automation systems.`;
            
            // Update Practical Experience with colored text
            profile.practicalExperience = `Strong foundations in algorithms, data structures, and statistical modeling. Hands-on experience building scalable AI solutions through academic projects.`;
            
            await profile.save();
            console.log('✅ Info cards updated successfully');
            console.log('\nCareer Aspirations:', profile.careerAspirations);
            console.log('\nPractical Experience:', profile.practicalExperience);
        } else {
            console.log('⚠️  Profile not found');
        }

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateInfoCards();
