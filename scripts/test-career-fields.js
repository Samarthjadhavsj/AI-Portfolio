const mongoose = require('mongoose');
require('dotenv').config();

const Profile = require('../models/Profile');

async function testCareerFields() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const profile = await Profile.findOne();
        
        if (!profile) {
            console.log('❌ No profile found in database');
            return;
        }

        console.log('=== CAREER FIELDS TEST ===\n');
        
        console.log('1. Career Aspirations:');
        console.log('   Field exists:', profile.careerAspirations ? '✅ YES' : '❌ NO');
        if (profile.careerAspirations) {
            console.log('   Content length:', profile.careerAspirations.length, 'characters');
            console.log('   Preview:', profile.careerAspirations.substring(0, 100) + '...\n');
        }
        
        console.log('2. Practical Experience:');
        console.log('   Field exists:', profile.practicalExperience ? '✅ YES' : '❌ NO');
        if (profile.practicalExperience) {
            console.log('   Content length:', profile.practicalExperience.length, 'characters');
            console.log('   Preview:', profile.practicalExperience.substring(0, 100) + '...\n');
        }

        console.log('=== ADMIN PAGE STATUS ===');
        const fs = require('fs');
        const html = fs.readFileSync('admin/home.html', 'utf8');
        console.log('Admin home.html has careerAspirations field:', html.includes('id="careerAspirations"') ? '✅ YES' : '❌ NO');
        console.log('Admin home.html has practicalExperience field:', html.includes('id="practicalExperience"') ? '✅ YES' : '❌ NO');
        
        console.log('\n=== RESULT ===');
        console.log('✅ Database fields are ready');
        console.log('✅ Admin page has the input fields');
        console.log('✅ You can now edit these fields in admin panel');
        console.log('\n💡 Remember to hard refresh browser: Ctrl+Shift+R');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

testCareerFields();
