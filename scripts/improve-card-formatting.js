const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('../models/Profile');

async function improveCardFormatting() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const careerAspirations = `Proficient in <span class="text-blue">Python</span> with frameworks like TensorFlow, PyTorch, and Scikit-learn.<br><br>I've collaborated with teams through hackathons and technical expos to develop AI applications, from predictive analytics to intelligent automation systems.`;

        const practicalExperience = `Strong foundations in algorithms, data structures, and statistical modeling.<br><br>Hands-on experience building scalable AI solutions through academic projects and real-world applications.`;

        await Profile.updateOne({}, { 
            careerAspirations: careerAspirations,
            practicalExperience: practicalExperience
        });

        console.log('✅ Updated Career Aspirations:');
        console.log(careerAspirations);
        console.log('\n✅ Updated Practical Experience:');
        console.log(practicalExperience);

        console.log('\n✅ All formatting improvements applied!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

improveCardFormatting();
