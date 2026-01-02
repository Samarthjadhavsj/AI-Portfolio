const mongoose = require('mongoose');
const Experience = require('../models/Experience');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function updateAchievements() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Delete LeetCode achievement
        const leetcodeDeleted = await Experience.deleteOne({ 
            type: 'achievement',
            title: { $regex: /leetcode/i }
        });
        console.log('✅ Deleted LeetCode achievement:', leetcodeDeleted.deletedCount);

        // Add AI Verse 2.0 Hackathon achievement
        const hackathon = await Experience.create({
            type: 'achievement',
            title: 'AI Verse 2.0 Hackathon - 4th Position',
            organization: 'B. M. S. College of Engineering',
            location: 'Bengaluru',
            period: '2025',
            description: 'Secured 4th position in the AI Verse 2.0 Hackathon 2025, organized by Augment AI and B. M. S. College of Engineering. A 48-hour journey of brainstorming, coding, and problem-solving focused on AI-driven innovation and real-world applications of Machine Learning and Deep Learning.',
            link: 'https://www.linkedin.com/posts/samarth-a-jadhav-5a401625b_hackathon-artificialintelligence-machinelearning-activity-7393696895216439296-yjTH',
            order: 1,
            visible: true
        });

        console.log('✅ Added hackathon achievement:', hackathon.title);

        // Display all achievements
        const allAchievements = await Experience.find({ type: 'achievement' }).sort({ order: 1 });
        console.log('\n📊 Current Achievements:');
        allAchievements.forEach(exp => {
            console.log(`  - ${exp.title}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateAchievements();
