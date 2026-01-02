const mongoose = require('mongoose');
const Experience = require('../models/Experience');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function addInternship() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Add Future Interns internship
        const internship = await Experience.create({
            type: 'internship',
            title: 'Machine Learning Intern',
            organization: 'Future Interns',
            location: 'India · Remote',
            period: 'Dec 2025 - Present · 2 mos',
            description: 'Selected as a Machine Learning Intern under the Future Interns Fellowship Program. Working on data-driven projects involving predictive modeling, pattern analysis, and intelligent system development. Gaining hands-on experience in data preprocessing, model building, evaluation, and visualization using real-world datasets.',
            link: '',
            order: 0,
            visible: true
        });

        console.log('✅ Added internship:', internship.title);

        // Display all experiences
        const allExperiences = await Experience.find().sort({ type: 1, order: 1 });
        console.log('\n📊 Current Experiences:');
        allExperiences.forEach(exp => {
            console.log(`  - [${exp.type}] ${exp.title} at ${exp.organization || 'N/A'}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

addInternship();
