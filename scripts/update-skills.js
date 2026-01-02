const mongoose = require('mongoose');
const Skill = require('../models/Skill');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function updateSkills() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Update "Tools & Technologies" to "AI Technology"
        const toolsSkill = await Skill.findOne({ category: 'Tools & Technologies' });
        if (toolsSkill) {
            toolsSkill.category = 'AI Technology';
            toolsSkill.icon = 'ai-technology';
            toolsSkill.description = 'Advanced AI tools and technologies';
            await toolsSkill.save();
            console.log('✅ Updated "Tools & Technologies" to "AI Technology"');
        } else {
            console.log('⚠️  "Tools & Technologies" not found');
        }

        // Update "Soft Skills" to "AI Stack"
        const softSkill = await Skill.findOne({ category: 'Soft Skills' });
        if (softSkill) {
            softSkill.category = 'AI Stack';
            softSkill.icon = 'ai-stack';
            softSkill.description = 'AI & ML technology stack';
            await softSkill.save();
            console.log('✅ Updated "Soft Skills" to "AI Stack"');
        } else {
            console.log('⚠️  "Soft Skills" not found');
        }

        // Display all skills
        const allSkills = await Skill.find().sort({ order: 1 });
        console.log('\n📊 Current Skills:');
        allSkills.forEach(skill => {
            console.log(`  - ${skill.category} (icon: ${skill.icon})`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateSkills();
