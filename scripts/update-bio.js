const mongoose = require('mongoose');
const Profile = require('../models/Profile');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function updateBio() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const profile = await Profile.findOne();
        
        if (profile) {
            profile.bio = `I'm a passionate <span class="text-blue">AI Engineer</span> specializing in <span class="text-purple">machine learning</span>, <span class="text-pink">deep learning</span>, and <span class="text-orange">natural language processing</span>. I design and deploy intelligent systems that solve real-world problems using cutting-edge AI technologies.`;
            
            profile.careerAspirations = `Proficient in <span class="text-blue">Python</span> with frameworks like TensorFlow, PyTorch, and Scikit-learn. I've collaborated with teams through hackathons and technical expos to develop AI applications, from predictive analytics to intelligent automation systems.`;
            
            profile.practicalExperience = `Strong foundations in algorithms, data structures, and statistical modeling. Hands-on experience building scalable AI solutions through academic projects.`;
            
            profile.communityEngagement = `I'm eager to explore <span class="text-purple">Large Language Models</span> and <span class="text-orange">Agentic AI</span> systems. My goal is to contribute to AI advancement while ensuring ethical and responsible implementation.`;
            
            await profile.save();
            console.log('✅ Bio updated successfully');
        } else {
            console.log('⚠️  Profile not found');
        }

        await mongoose.connection.close();
        console.log('✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateBio();
