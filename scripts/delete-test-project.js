const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

async function deleteTestProject() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const result = await Project.deleteOne({ title: 'samarth' });
        
        if (result.deletedCount > 0) {
            console.log('✅ Deleted test project "samarth"');
        } else {
            console.log('❌ Project not found');
        }

        const remaining = await Project.countDocuments();
        console.log(`\n📊 Remaining projects: ${remaining}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

deleteTestProject();
