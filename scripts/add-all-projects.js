const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const projects = [
    {
        title: 'API AI Assistant',
        description: 'Advanced AI assistant built with TypeScript, featuring intelligent API integration and natural language processing capabilities.',
        tags: ['TypeScript', 'AI', 'API'],
        githubUrl: 'https://github.com/samarthjadhavsj/API-AI-Assistant',
        status: 'published',
        order: 1
    },
    {
        title: 'VisionForge AI',
        description: 'Advanced AI-powered solutions for thermal imaging, change detection, and intelligent document automation using cutting-edge computer vision techniques.',
        tags: ['Python', 'Computer Vision', 'AI'],
        githubUrl: 'https://github.com/samarthjadhavsj/VisionForge-AI-',
        status: 'published',
        order: 2
    },
    {
        title: 'MSME Growth Consulting - TechCraft Case Study',
        description: 'DT Fellowship Assignment: Diagnosing founder bottlenecks and designing systemic experiments for MSME scale. Case study of TechCraft Solutions - transforming founder-dependent revenue from 5% to 50%.',
        tags: ['Case Study', 'Business Analysis', 'Strategy'],
        githubUrl: 'https://github.com/samarthjadhavsj/msme-growth-consulting-techcraft-case-study',
        status: 'published',
        order: 3
    },
    {
        title: 'Trading Analysis - Market Sentiment vs Trader Behavior',
        description: 'Comprehensive analysis of market sentiment versus trader behavior using Python. Data-driven insights into trading patterns and market dynamics.',
        tags: ['Python', 'Data Analysis', 'Trading'],
        githubUrl: 'https://github.com/samarthjadhavsj/-TRADING-ANALYSIS-MARKET-SENTIMENT-VS-TRADER-BEHAVIOR',
        status: 'published',
        order: 4
    },
    {
        title: 'AI X-Ray Image Search',
        description: '🏥 AI-powered medical X-ray image search system using deep learning. Search by uploading similar images or using text descriptions. Supports chest X-rays and fracture detection with smart category filtering.',
        tags: ['Python', 'Deep Learning', 'Medical AI'],
        githubUrl: 'https://github.com/samarthjadhavsj/AI-X-Ray-Image-Search',
        status: 'published',
        order: 5
    },
    {
        title: 'E-Waste Management System',
        description: 'Full-stack e-waste recycling platform with role-based access control. Users locate certified collection centers via interactive maps with routing, earn points by recycling devices, and redeem rewards.',
        tags: ['HTML', 'Full-Stack', 'Maps API'],
        githubUrl: 'https://github.com/samarthjadhavsj/E-Waste-Management-System',
        status: 'published',
        order: 6
    },
    {
        title: 'AI-Powered Exam Proctoring Platform',
        description: 'Innovative AI-driven solution developed during the AI Verse 2.0 Hackathon. Combines cutting-edge artificial intelligence with creative problem-solving for real-time exam monitoring with face detection, attention tracking, and behavior analysis.',
        tags: ['HTML', 'Computer Vision', 'Hackathon'],
        githubUrl: 'https://github.com/samarthjadhavsj/Hackathon-2.0-AI-Powered-Exam-Proctoring-Platform',
        status: 'published',
        order: 7
    },
    {
        title: 'Real Estate Analytics',
        description: 'Machine Learning Development Life Cycle project for real estate price prediction. Trained and compared 11 regression models, selecting Random Forest for optimal performance.',
        tags: ['Jupyter Notebook', 'ML', 'Random Forest'],
        githubUrl: 'https://github.com/samarthjadhavsj/Real-Estate-Analytics',
        status: 'published',
        order: 8
    },
    {
        title: 'AI Assistant (Alexa)',
        description: 'An intelligent AI voice assistant named Alexa, built in Python using an API for advanced natural language processing. Features real-time speech recognition, multithreaded audio playback, and natural language understanding.',
        tags: ['Python', 'NLP', 'Voice AI'],
        githubUrl: 'https://github.com/samarthjadhavsj/AI-Assistant-',
        status: 'published',
        order: 9
    },
    {
        title: 'Livestock Ownership Management System',
        description: 'Livestock Ownership Management System – A Full Stack Project using Python programming with Flask (backend), MySQL (database), Apache server via XAMPP, and Bootstrap with Jinja2 (frontend). Enables comprehensive livestock tracking and management.',
        tags: ['CSS', 'Flask', 'MySQL'],
        githubUrl: 'https://github.com/samarthjadhavsj/Livestock-Ownership-Management-System',
        status: 'published',
        order: 10
    }
];

async function addProjects() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        // Add all projects
        const result = await Project.insertMany(projects);
        console.log(`✅ Added ${result.length} projects to database\n`);

        result.forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

addProjects();
