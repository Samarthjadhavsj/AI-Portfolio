// Script to clear the invalid localhost resume URL
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Profile = require('../models/Profile');

async function clearResumeUrl() {
  try {
    console.log('🔄 Clearing invalid resume URL...\n');
    
    await connectDB();
    
    const profile = await Profile.findOneAndUpdate(
      {},
      { 
        resume: { url: '', publicId: '' }
      },
      { new: true }
    );
    
    if (!profile) {
      console.log('❌ No profile found in database');
      process.exit(1);
    }
    
    console.log('✅ Resume URL cleared successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Wait for Render to deploy the PDF upload fix (2-3 minutes)');
    console.log('2. Go to /admin/about.html');
    console.log('3. Upload your resume PDF using the Upload button');
    console.log('4. Click "Save All Changes"');
    console.log('\nYour resume will then be uploaded to Cloudinary with a public URL.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearResumeUrl();
