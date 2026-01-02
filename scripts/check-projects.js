const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

async function checkProjects() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const projects = await Project.find().sort({ createdAt: -1 });
        
        console.log(`=== ALL PROJECTS (${projects.length} total) ===\n`);
        
        projects.forEach((p, i) => {
            console.log(`${i+1}. ${p.title}`);
            console.log('   Description:', p.description?.substring(0, 80));
            console.log('   Tags:', p.tags);
            console.log('   Image:', p.image?.url ? 'YES' : 'NO');
            console.log('   GitHub:', p.githubUrl ? 'YES' : 'NO');
            console.log('   Live URL:', p.liveUrl ? 'YES' : 'NO');
            console.log('');
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

checkProjects();
