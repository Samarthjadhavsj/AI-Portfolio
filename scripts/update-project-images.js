const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

async function updateProjectImages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Better, more relevant project images with proper aspect ratios
        const projectImages = {
            'API AI Assistant': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop&q=80',
            'VisionForge AI': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=675&fit=crop&q=80',
            'MSME Growth Consulting - TechCraft Case Study': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80',
            'AI X-Ray Image Search': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&h=675&fit=crop&q=80',
            'E-Waste Management System': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=675&fit=crop&q=80',
            'AI-Powered Exam Proctoring Platform': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=675&fit=crop&q=80',
            'Livestock Ownership Management System': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=675&fit=crop&q=80',
            'AI Assistant (Alexa)': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=675&fit=crop&q=80',
            'Real Estate Analytics': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=675&fit=crop&q=80',
            'Trading Analysis - Market Sentiment vs Trader Behavior': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop&q=80'
        };

        console.log('=== UPDATING PROJECT IMAGES ===\n');

        for (const [title, imageUrl] of Object.entries(projectImages)) {
            const result = await Project.updateOne(
                { title: title },
                { $set: { 'image.url': imageUrl } }
            );

            if (result.modifiedCount > 0) {
                console.log(`✅ ${title}`);
            } else {
                console.log(`⚠️  ${title} - Not found`);
            }
        }

        console.log('\n✅ All project images updated with proper aspect ratios!');
        console.log('📐 Images are now 16:9 ratio (1200x675) for perfect fitting');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

updateProjectImages();
