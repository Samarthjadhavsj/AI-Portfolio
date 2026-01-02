const mongoose = require('mongoose');
const Experience = require('../models/Experience');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function updateInternshipPeriod() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Update the Future Interns internship period
        const internship = await Experience.findOne({ 
            type: 'internship',
            organization: 'Future Interns'
        });

        if (internship) {
            internship.period = 'Dec 2025 - Present';
            await internship.save();
            console.log('✅ Updated internship period to:', internship.period);
        } else {
            console.log('⚠️  Future Interns internship not found');
        }

        await mongoose.connection.close();
        console.log('✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateInternshipPeriod();
