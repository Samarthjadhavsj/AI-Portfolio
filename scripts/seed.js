// Seed script to populate initial data
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');

// Import models
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Seed Profile
    console.log('👤 Seeding profile...');
    const profile = await Profile.create({
      name: 'Samarth A Jadhav',
      title: 'Aspiring AI Engineer',
      hero: {
        titleLine1: 'Aspiring',
        titleLine2: 'AI Engineer'
      },
      subtitle: 'Designing intelligent systems that learn, adapt, and scale.',
      education: 'BTech CSE - AI & ML',
      location: 'Bengaluru, India',
      bio: 'Passionate about AI and continuously learning to build innovative solutions.',
      careerAspirations: 'Driven to build a career in AI, ML, and Data Science. Passionate about developing advanced systems that solve real-world problems.',
      practicalExperience: 'Hands-on experience in ML and Data Science through academic projects and personal initiatives.',
      communityEngagement: 'Actively engaged with the AI community through platforms like LinkedIn and GitHub.',
      email: 'samarthjadhavsj121@gmail.com',
      phone: '+91 9535180652',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/samarth-a-jadhav-5a401625b/',
        github: 'https://github.com/Samarthjadhavsj',
        leetcode: 'https://leetcode.com/u/HeY_SaMM/',
        hackerrank: 'https://www.hackerrank.com/profile/samarthjadhavsj1'
      }
    });
    console.log('✅ Profile created\n');

    // Seed Projects
    console.log('📦 Seeding projects...');
    const projects = await Project.insertMany([
      {
        title: 'AI API Assistant',
        description: 'Advanced AI assistant built with TypeScript that helps developers interact with APIs through natural language.',
        tags: ['TypeScript', 'AI', 'API', 'NLP'],
        image: {
          url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
        },
        githubUrl: 'https://github.com/Samarthjadhavsj',
        liveUrl: 'https://example.com/demo',
        featured: true,
        order: 1,
        status: 'published'
      },
      {
        title: 'VisionForge AI',
        description: 'Computer vision project using deep learning for image recognition and object detection.',
        tags: ['Python', 'Computer Vision', 'Deep Learning', 'TensorFlow'],
        image: {
          url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop'
        },
        githubUrl: 'https://github.com/Samarthjadhavsj',
        liveUrl: 'https://example.com/vision',
        featured: true,
        order: 2,
        status: 'published'
      },
      {
        title: 'Real Estate Analytics',
        description: 'Data analytics platform for real estate market trends and price predictions using machine learning.',
        tags: ['Python', 'Data Science', 'ML', 'Analytics'],
        image: {
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
        },
        githubUrl: 'https://github.com/Samarthjadhavsj',
        liveUrl: 'https://example.com/analytics',
        featured: false,
        order: 3,
        status: 'published'
      }
    ]);
    console.log(`✅ ${projects.length} projects created\n`);

    // Seed Skills
    console.log('💻 Seeding skills...');
    const skills = await Skill.insertMany([
      {
        category: 'Programming Skills',
        icon: 'code',
        skills: ['Python', 'Java', 'HTML/CSS', 'Git'],
        description: 'Core programming languages and version control',
        order: 1,
        visible: true
      },
      {
        category: 'Libraries & Frameworks',
        icon: 'library',
        skills: ['NumPy', 'Pandas', 'Scikit-learn', 'Bootstrap'],
        description: 'Data science and web development frameworks',
        order: 2,
        visible: true
      },
      {
        category: 'Tools & Technologies',
        icon: 'tools',
        skills: ['VS Code', 'Jupyter', 'MySQL', 'GitHub'],
        description: 'Development tools and databases',
        order: 3,
        visible: true
      },
      {
        category: 'Soft Skills',
        icon: 'users',
        skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability'],
        description: 'Professional and interpersonal skills',
        order: 4,
        visible: true
      }
    ]);
    console.log(`✅ ${skills.length} skill categories created\n`);

    // Seed Experience
    console.log('🎓 Seeding experience...');
    const experiences = await Experience.insertMany([
      {
        type: 'education',
        title: 'BTech CSE - AI & ML',
        organization: 'Presidency University',
        location: 'Bengaluru',
        period: '2022 - 2026',
        startDate: '2022',
        endDate: '2026',
        description: 'Specialization in Artificial Intelligence and Machine Learning',
        order: 1,
        visible: true
      },
      {
        type: 'achievement',
        title: 'Inventra\'25 Achievement',
        organization: 'LinkedIn',
        period: '2025',
        startDate: '2025',
        description: 'Recognition for innovation and technical excellence',
        link: 'https://www.linkedin.com/in/samarth-a-jadhav-5a401625b/',
        order: 2,
        visible: true
      },
      {
        type: 'achievement',
        title: 'LeetCode Problem Solver',
        organization: 'LeetCode',
        period: 'Ongoing',
        description: 'Active problem solver with 150+ problems solved',
        link: 'https://leetcode.com/u/HeY_SaMM/',
        order: 3,
        visible: true
      }
    ]);
    console.log(`✅ ${experiences.length} experience entries created\n`);

    console.log('🎉 Database seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Profile: 1`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Skills: ${skills.length}`);
    console.log(`   - Experience: ${experiences.length}`);
    console.log('\n✅ Ready to start the server!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedData();
