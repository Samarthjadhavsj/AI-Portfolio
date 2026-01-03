const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'Samarth A Jadhav'
  },
  
  // Hero title fields - separate for styling
  heroLine1: {
    type: String,
    trim: true,
    default: 'Aspiring'
  },
  heroLine2: {
    type: String,
    trim: true,
    default: 'AI Engineer'
  },
  
  // Legacy title field (auto-generated from hero fields)
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Aspiring AI Engineer'
  },
  subtitle: {
    type: String,
    trim: true,
    default: 'Designing intelligent systems that learn, adapt, and scale.'
  },
  education: {
    type: String,
    trim: true,
    default: 'BTech CSE - AI & ML'
  },
  university: {
    type: String,
    trim: true,
    default: 'Presidency University'
  },
  educationPeriod: {
    type: String,
    trim: true,
    default: '2022-2026'
  },
  location: {
    type: String,
    trim: true,
    default: 'Bengaluru, India'
  },
  
  // About/Bio
  bio: {
    type: String,
    trim: true,
    default: 'Passionate about AI and continuously learning to build innovative solutions.'
  },
  careerAspirations: {
    type: String,
    trim: true
  },
  practicalExperience: {
    type: String,
    trim: true
  },
  communityEngagement: {
    type: String,
    trim: true
  },
  
  // Media
  profileImage: {
    url: String, // Cloudinary URL
    publicId: String // Cloudinary public ID for deletion
  },
  resume: {
    url: String,
    publicId: String,
    filename: String
  },
  
  // Contact Info
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    default: 'samarthjadhavsj121@gmail.com'
  },
  phone: {
    type: String,
    trim: true,
    default: '+91 9535180652'
  },
  
  // Social Links
  socialLinks: {
    linkedin: {
      type: String,
      default: 'https://www.linkedin.com/in/samarth-a-jadhav-5a401625b/'
    },
    github: {
      type: String,
      default: 'https://github.com/Samarthjadhavsj'
    },
    leetcode: {
      type: String,
      default: 'https://leetcode.com/u/HeY_SaMM/'
    },
    hackerrank: {
      type: String,
      default: 'https://www.hackerrank.com/profile/samarthjadhavsj1'
    }
  },
  
  // Metadata
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
