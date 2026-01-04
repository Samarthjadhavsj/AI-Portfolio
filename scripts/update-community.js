// Script to update Community Engagement field directly
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Profile = require('../models/Profile');

const newCommunityEngagement = `I maintain an active presence on LinkedIn to stay informed about the latest developments in AI and connect with industry professionals. I actively engage with the AI community through competitive programming platforms like LeetCode and HackerRank to sharpen my problem-solving skills. I continuously work on personal projects incorporating advanced AI technologies, applying newly learned concepts to gain practical experience. I believe in learning by doing—constantly exploring emerging AI trends, experimenting with cutting-edge technologies, and implementing them in real-world projects to deepen my understanding and expertise.`;

async function updateCommunityEngagement() {
  try {
    console.log('🔄 Updating Community Engagement field...\n');
    
    await connectDB();
    
    const profile = await Profile.findOneAndUpdate(
      {},
      { communityEngagement: newCommunityEngagement },
      { new: true, upsert: false }
    );
    
    if (!profile) {
      console.log('❌ No profile found in database');
      process.exit(1);
    }
    
    console.log('✅ Profile updated successfully');
    console.log('\n--- Updated Community Engagement ---');
    console.log('Value:', profile.communityEngagement);
    console.log('Length:', profile.communityEngagement?.length);
    
    console.log('\n✅ Done! Community Engagement has been updated.');
    console.log('🌐 Visit your website and hard refresh (Ctrl+Shift+R) to see changes.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateCommunityEngagement();
