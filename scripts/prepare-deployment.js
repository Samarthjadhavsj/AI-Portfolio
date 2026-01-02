const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Admin = require('../models/Admin');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function checkDeploymentReadiness() {
    console.log('\n🚀 CHECKING DEPLOYMENT READINESS\n');
    console.log('='.repeat(50));
    
    const issues = [];
    const warnings = [];
    
    // Check environment variables
    console.log('\n📋 Environment Variables:');
    
    if (!process.env.MONGODB_URI) {
        issues.push('❌ MONGODB_URI is not set');
    } else {
        console.log('✅ MONGODB_URI is set');
    }
    
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('change-this')) {
        issues.push('❌ JWT_SECRET needs to be changed to a secure value');
    } else if (process.env.JWT_SECRET.length < 32) {
        warnings.push('⚠️  JWT_SECRET should be at least 32 characters');
    } else {
        console.log('✅ JWT_SECRET is set');
    }
    
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER.includes('example')) {
        warnings.push('⚠️  EMAIL_USER not configured (contact form will not work)');
    } else {
        console.log('✅ EMAIL_USER is set');
    }
    
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS.includes('password-here')) {
        warnings.push('⚠️  EMAIL_PASS not configured (contact form will not work)');
    } else {
        console.log('✅ EMAIL_PASS is set');
    }
    
    // Check database connection
    console.log('\n📊 Database Connection:');
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connection successful');
        
        // Check collections
        console.log('\n📦 Database Collections:');
        
        const profileCount = await Profile.countDocuments();
        console.log(`✅ Profiles: ${profileCount}`);
        if (profileCount === 0) warnings.push('⚠️  No profile data found');
        
        const projectCount = await Project.countDocuments();
        console.log(`✅ Projects: ${projectCount}`);
        if (projectCount === 0) warnings.push('⚠️  No projects found');
        
        const skillCount = await Skill.countDocuments();
        console.log(`✅ Skills: ${skillCount}`);
        if (skillCount === 0) warnings.push('⚠️  No skills found');
        
        const experienceCount = await Experience.countDocuments();
        console.log(`✅ Experience: ${experienceCount}`);
        if (experienceCount === 0) warnings.push('⚠️  No experience data found');
        
        const adminCount = await Admin.countDocuments();
        console.log(`✅ Admin accounts: ${adminCount}`);
        if (adminCount === 0) issues.push('❌ No admin account found - run: npm run create-admin');
        
        await mongoose.connection.close();
        
    } catch (error) {
        issues.push(`❌ Database connection failed: ${error.message}`);
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 DEPLOYMENT READINESS SUMMARY\n');
    
    if (issues.length === 0 && warnings.length === 0) {
        console.log('✅ ALL CHECKS PASSED! Ready for deployment.\n');
        return true;
    }
    
    if (issues.length > 0) {
        console.log('❌ CRITICAL ISSUES (Must fix before deployment):\n');
        issues.forEach(issue => console.log('  ' + issue));
        console.log('');
    }
    
    if (warnings.length > 0) {
        console.log('⚠️  WARNINGS (Recommended to fix):\n');
        warnings.forEach(warning => console.log('  ' + warning));
        console.log('');
    }
    
    if (issues.length > 0) {
        console.log('❌ NOT READY FOR DEPLOYMENT\n');
        console.log('📖 See PRE-DEPLOYMENT-CHECKLIST.md for details\n');
        return false;
    } else {
        console.log('⚠️  READY WITH WARNINGS\n');
        console.log('You can deploy, but some features may not work properly.\n');
        return true;
    }
}

checkDeploymentReadiness()
    .then(ready => {
        process.exit(ready ? 0 : 1);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });
