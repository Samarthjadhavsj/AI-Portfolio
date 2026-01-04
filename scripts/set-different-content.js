// Script to set different content for Career Aspirations vs Goals & Vision
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Profile = require('../models/Profile');

const careerAspirationsContent = `Driven to build a successful career in Artificial Intelligence, Machine Learning, and Data Science. I am passionate about developing advanced AI systems that solve complex real-world problems and create meaningful impact. My career goal is to work with leading technology companies and contribute to cutting-edge AI research and development.`;

const goalsVisionContent = `My vision is to become a proficient AI engineer who contributes meaningfully to the advancement of artificial intelligence. I am particularly interested in exploring cutting-edge domains such as Large Language Models, Generative AI, and Agentic AI systems. I aspire to work on innovative projects that leverage AI to solve complex real-world problems and create positive societal impact. My goal is to remain at the forefront of AI innovation through continuous learning, hands-on experimentation, and collaboration with industry leaders, while ensuring ethical and responsible implementation of AI technologies.`;

async function setDifferentContent() {
  try {
    console.log('🔄 Setting different content for Career Aspirations and Goals & Vision...\n');
    
    await connectDB();
    
    const profile = await Profile.findOneAndUpdate(
      {},
      { 
        careerAspirations: careerAspirationsContent,
        goalsVision: goalsVisionContent
      },
      { new: true }
    );
    
    if (!profile) {
      console.log('❌ No profile found in database');
      process.exit(1);
    }
    
    console.log('✅ Content updated successfully!\n');
    console.log('📝 Career Aspirations (Home page):');
    console.log(profile.careerAspirations);
    console.log('\n📝 Goals & Vision (About page):');
    console.log(profile.goalsVision);
    console.log('\n✅ Done! Visit your website and hard refresh (Ctrl+Shift+R) to see the changes.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

setDifferentContent();
