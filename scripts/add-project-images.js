const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

async function addProjectImages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Project images mapping - using Unsplash for high-quality, relevant images
        const projectImages = {
            'API AI Assistant': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', // AI/Robot
            'VisionForge AI': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // Thermal/Vision tech
            'MSME Growth Consulting - TechCraft Case Study': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Business analytics
            'AI X-Ray Image Search': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80', // Medical/X-ray
            'E-Waste Management System': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80', // E-waste/recycling
            'AI-Powered Exam Proctoring Platform': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', // Online exam/computer
            'Livestock Ownership Management System': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80', // Farm/livestock
            'AI Assistant (Alexa)': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80', // Voice assistant/speaker
            'Real Estate Analytics': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', // Real estate/houses
            'Trading Analysis - Market Sentiment vs Trader Behavior': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80' // Trading/stocks
        };

        console.log('=== ADDING IMAGES TO PROJECTS ===\n');

        for (const [title, imageUrl] of Object.entries(projectImages)) {
            const result = await Project.updateOne(
                { title: title },
                { $set: { 'image.url': imageUrl } }
            );

            if (result.modifiedCount > 0) {
                console.log(`✅ ${title}`);
                console.log(`   Image: ${imageUrl.substring(0, 60)}...`);
            } else {
                console.log(`⚠️  ${title} - Not found or already has image`);
            }
        }

        console.log('\n=== VERIFICATION ===');
        const projects = await Project.find();
        const withImages = projects.filter(p => p.image?.url).length;
        console.log(`Projects with images: ${withImages}/${projects.length}`);

        console.log('\n✅ All project images added!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

addProjectImages();
