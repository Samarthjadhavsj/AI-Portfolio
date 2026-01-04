// Script to check Community Engagement field in database
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Profile = require('../models/Profile');

async function checkCommunityEngagement() {
  try {
    console.log('🔍 Checking Community Engagement field...\n');
    
    await connectDB();
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      console.log('❌ No profile found in database');
      process.exit(1);
    }
    
    console.log('✅ Profile found');
    console.log('📦 Profile ID:', profile._id);
    console.log('\n--- Community Engagement Field ---');
    console.log('Value:', profile.communityEngagement);
    console.log('Type:', typeof profile.communityEngagement);
    console.log('Length:', profile.communityEngagement?.length || 0);
    console.log('Is empty?', !profile.communityEngagement);
    console.log('Is undefined?', profile.communityEngagement === undefined);
    console.log('Is null?', profile.communityEngagement === null);
    
    console.log('\n--- Other Fields for Comparison ---');
    console.log('careerAspirations:', profile.careerAspirations?.substring(0, 50) + '...');
    console.log('bio:', profile.bio?.substring(0, 50) + '...');
    
    console.log('\n--- All Profile Fields ---');
    console.log(JSON.stringify(profile.toObject(), null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCommunityEngagement();
