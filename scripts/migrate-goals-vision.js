// Migration script to copy careerAspirations to goalsVision field
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Profile = require('../models/Profile');

async function migrateGoalsVision() {
  try {
    console.log('🔄 Migrating Goals & Vision field...\n');
    
    await connectDB();
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      console.log('❌ No profile found in database');
      process.exit(1);
    }
    
    console.log('✅ Profile found');
    console.log('📦 Current careerAspirations:', profile.careerAspirations?.substring(0, 100) + '...');
    console.log('📦 Current goalsVision:', profile.goalsVision || '(empty)');
    
    // Copy careerAspirations to goalsVision if goalsVision is empty
    if (!profile.goalsVision && profile.careerAspirations) {
      profile.goalsVision = profile.careerAspirations;
      await profile.save();
      
      console.log('\n✅ Migration complete!');
      console.log('📝 goalsVision now contains:', profile.goalsVision.substring(0, 100) + '...');
      console.log('\n📌 Note: careerAspirations is still preserved for the Home page.');
    } else if (profile.goalsVision) {
      console.log('\n✅ goalsVision already has content, no migration needed.');
    } else {
      console.log('\n⚠️ Both fields are empty, nothing to migrate.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

migrateGoalsVision();
