const mongoose = require('mongoose');
require('dotenv').config();
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Contact = require('../models/Contact');

let testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
};

function logTest(category, test, status, message = '') {
    const result = { category, test, status, message };
    testResults.tests.push(result);
    
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} [${category}] ${test}${message ? ': ' + message : ''}`);
    
    if (status === 'PASS') testResults.passed++;
    else if (status === 'FAIL') testResults.failed++;
    else testResults.warnings++;
}

async function testDatabase() {
    console.log('\n═══════════════════════════════════════');
    console.log('📊 DATABASE TESTS');
    console.log('═══════════════════════════════════════\n');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logTest('Database', 'MongoDB Connection', 'PASS');

        // Test Profile
        const profile = await Profile.findOne();
        if (profile) {
            logTest('Database', 'Profile Document Exists', 'PASS');
            
            // Check required fields
            if (profile.name) logTest('Database', 'Profile: Name', 'PASS', profile.name);
            else logTest('Database', 'Profile: Name', 'FAIL', 'Missing');
            
            if (profile.email) logTest('Database', 'Profile: Email', 'PASS', profile.email);
            else logTest('Database', 'Profile: Email', 'WARN', 'Missing');
            
            if (profile.bio) logTest('Database', 'Profile: Bio', 'PASS', `${profile.bio.length} chars`);
            else logTest('Database', 'Profile: Bio', 'WARN', 'Missing');
            
            if (profile.profileImage?.url) logTest('Database', 'Profile: Image URL', 'PASS');
            else logTest('Database', 'Profile: Image URL', 'WARN', 'Not set');
            
            if (profile.resume?.url) logTest('Database', 'Profile: Resume URL', 'PASS');
            else logTest('Database', 'Profile: Resume URL', 'WARN', 'Not set');
            
            if (profile.careerAspirations) logTest('Database', 'Profile: Career Aspirations', 'PASS');
            else logTest('Database', 'Profile: Career Aspirations', 'WARN', 'Missing');
            
            if (profile.practicalExperience) logTest('Database', 'Profile: Practical Experience', 'PASS');
            else logTest('Database', 'Profile: Practical Experience', 'WARN', 'Missing');
        } else {
            logTest('Database', 'Profile Document', 'FAIL', 'Not found');
        }

        // Test Projects
        const projects = await Project.find();
        logTest('Database', 'Projects Collection', projects.length > 0 ? 'PASS' : 'FAIL', `${projects.length} projects`);
        
        if (projects.length > 0) {
            const withImages = projects.filter(p => p.image?.url).length;
            logTest('Database', 'Projects with Images', withImages > 0 ? 'PASS' : 'WARN', `${withImages}/${projects.length}`);
            
            const withGithub = projects.filter(p => p.githubUrl).length;
            logTest('Database', 'Projects with GitHub', withGithub > 0 ? 'PASS' : 'WARN', `${withGithub}/${projects.length}`);
        }

        // Test Skills
        const skills = await Skill.find();
        logTest('Database', 'Skills Collection', skills.length > 0 ? 'PASS' : 'FAIL', `${skills.length} skills`);

        // Test Experience
        const experiences = await Experience.find();
        logTest('Database', 'Experience Collection', experiences.length > 0 ? 'PASS' : 'WARN', `${experiences.length} experiences`);

        // Test Contacts
        const contacts = await Contact.find();
        logTest('Database', 'Contact Messages', 'PASS', `${contacts.length} messages`);

    } catch (error) {
        logTest('Database', 'Connection', 'FAIL', error.message);
    }
}

async function testFileSystem() {
    console.log('\n═══════════════════════════════════════');
    console.log('📁 FILE SYSTEM TESTS');
    console.log('═══════════════════════════════════════\n');

    const fs = require('fs');
    const path = require('path');

    // Frontend Pages
    const frontendPages = [
        'index.html',
        'about.html',
        'skills.html',
        'projects.html',
        'coding-profiles.html',
        'experience.html',
        'contact.html'
    ];

    frontendPages.forEach(page => {
        if (fs.existsSync(page)) {
            logTest('Frontend', `Page: ${page}`, 'PASS');
        } else {
            logTest('Frontend', `Page: ${page}`, 'FAIL', 'File not found');
        }
    });

    // Admin Pages
    const adminPages = [
        'admin/login.html',
        'admin/dashboard.html',
        'admin/home.html',
        'admin/about.html',
        'admin/skills.html',
        'admin/projects.html',
        'admin/coding-profiles.html',
        'admin/experience.html',
        'admin/contact.html'
    ];

    adminPages.forEach(page => {
        if (fs.existsSync(page)) {
            logTest('Admin', `Page: ${page}`, 'PASS');
        } else {
            logTest('Admin', `Page: ${page}`, 'FAIL', 'File not found');
        }
    });

    // JavaScript Files
    const jsFiles = [
        'api-helper.js',
        'profile-loader.js',
        'projects-loader.js',
        'skills-loader.js',
        'experience-loader.js',
        'contact-form.js',
        'page-script.js'
    ];

    jsFiles.forEach(file => {
        if (fs.existsSync(file)) {
            logTest('JavaScript', file, 'PASS');
        } else {
            logTest('JavaScript', file, 'FAIL', 'File not found');
        }
    });

    // CSS
    if (fs.existsSync('styles.css')) {
        const cssSize = fs.statSync('styles.css').size;
        logTest('CSS', 'styles.css', 'PASS', `${(cssSize / 1024).toFixed(2)} KB`);
    } else {
        logTest('CSS', 'styles.css', 'FAIL', 'File not found');
    }

    // Server Files
    const serverFiles = [
        'server.js',
        'package.json',
        '.env',
        'vercel.json'
    ];

    serverFiles.forEach(file => {
        if (fs.existsSync(file)) {
            logTest('Server', file, 'PASS');
        } else {
            logTest('Server', file, file === '.env' ? 'WARN' : 'FAIL', 'File not found');
        }
    });

    // Models
    const models = [
        'models/Profile.js',
        'models/Project.js',
        'models/Skill.js',
        'models/Experience.js',
        'models/Contact.js',
        'models/Admin.js'
    ];

    models.forEach(model => {
        if (fs.existsSync(model)) {
            logTest('Models', model, 'PASS');
        } else {
            logTest('Models', model, 'FAIL', 'File not found');
        }
    });

    // Routes
    const routes = [
        'routes/admin.js',
        'routes/upload.js'
    ];

    routes.forEach(route => {
        if (fs.existsSync(route)) {
            logTest('Routes', route, 'PASS');
        } else {
            logTest('Routes', route, 'FAIL', 'File not found');
        }
    });

    // Uploads folder
    if (fs.existsSync('uploads')) {
        const files = fs.readdirSync('uploads');
        logTest('Uploads', 'Folder exists', 'PASS', `${files.length} files`);
    } else {
        logTest('Uploads', 'Folder exists', 'WARN', 'Folder not found');
    }
}

async function testContentIntegrity() {
    console.log('\n═══════════════════════════════════════');
    console.log('🔍 CONTENT INTEGRITY TESTS');
    console.log('═══════════════════════════════════════\n');

    const fs = require('fs');

    // Check if profile-loader is included in all pages
    const pagesNeedingProfileLoader = [
        'index.html',
        'about.html',
        'contact.html'
    ];

    pagesNeedingProfileLoader.forEach(page => {
        if (fs.existsSync(page)) {
            const content = fs.readFileSync(page, 'utf8');
            if (content.includes('profile-loader.js')) {
                logTest('Content', `${page} includes profile-loader`, 'PASS');
            } else {
                logTest('Content', `${page} includes profile-loader`, 'FAIL');
            }
        }
    });

    // Check if projects-loader is in projects.html
    if (fs.existsSync('projects.html')) {
        const content = fs.readFileSync('projects.html', 'utf8');
        if (content.includes('projects-loader.js')) {
            logTest('Content', 'projects.html includes projects-loader', 'PASS');
        } else {
            logTest('Content', 'projects.html includes projects-loader', 'FAIL');
        }
    }

    // Check if skills-loader is in skills.html
    if (fs.existsSync('skills.html')) {
        const content = fs.readFileSync('skills.html', 'utf8');
        if (content.includes('skills-loader.js')) {
            logTest('Content', 'skills.html includes skills-loader', 'PASS');
        } else {
            logTest('Content', 'skills.html includes skills-loader', 'FAIL');
        }
    }

    // Check if experience-loader is in experience.html
    if (fs.existsSync('experience.html')) {
        const content = fs.readFileSync('experience.html', 'utf8');
        if (content.includes('experience-loader.js')) {
            logTest('Content', 'experience.html includes experience-loader', 'PASS');
        } else {
            logTest('Content', 'experience.html includes experience-loader', 'FAIL');
        }
    }

    // Check admin pages have authentication
    const adminPages = fs.readdirSync('admin').filter(f => f.endsWith('.html') && f !== 'login.html');
    adminPages.forEach(page => {
        const content = fs.readFileSync(`admin/${page}`, 'utf8');
        if (content.includes('adminToken') || content.includes('localStorage.getItem')) {
            logTest('Security', `admin/${page} has auth check`, 'PASS');
        } else {
            logTest('Security', `admin/${page} has auth check`, 'WARN');
        }
    });
}

async function testEnvironment() {
    console.log('\n═══════════════════════════════════════');
    console.log('⚙️  ENVIRONMENT TESTS');
    console.log('═══════════════════════════════════════\n');

    // Check environment variables
    if (process.env.MONGODB_URI) {
        logTest('Environment', 'MONGODB_URI', 'PASS');
    } else {
        logTest('Environment', 'MONGODB_URI', 'FAIL', 'Not set');
    }

    if (process.env.JWT_SECRET) {
        logTest('Environment', 'JWT_SECRET', 'PASS');
    } else {
        logTest('Environment', 'JWT_SECRET', 'WARN', 'Not set');
    }

    if (process.env.EMAIL_USER) {
        logTest('Environment', 'EMAIL_USER', 'PASS');
    } else {
        logTest('Environment', 'EMAIL_USER', 'WARN', 'Not set (contact form may not work)');
    }

    // Check package.json
    const fs = require('fs');
    if (fs.existsSync('package.json')) {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        const requiredDeps = [
            'express',
            'mongoose',
            'cors',
            'dotenv',
            'bcryptjs',
            'jsonwebtoken',
            'nodemailer',
            'express-validator',
            'multer'
        ];

        requiredDeps.forEach(dep => {
            if (pkg.dependencies && pkg.dependencies[dep]) {
                logTest('Dependencies', dep, 'PASS', pkg.dependencies[dep]);
            } else {
                logTest('Dependencies', dep, 'FAIL', 'Not installed');
            }
        });
    }
}

async function generateReport() {
    console.log('\n═══════════════════════════════════════');
    console.log('📋 TEST SUMMARY');
    console.log('═══════════════════════════════════════\n');

    const total = testResults.passed + testResults.failed + testResults.warnings;
    const passRate = ((testResults.passed / total) * 100).toFixed(1);

    console.log(`Total Tests: ${total}`);
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️  Warnings: ${testResults.warnings}`);
    console.log(`\nPass Rate: ${passRate}%`);

    if (testResults.failed === 0) {
        console.log('\n🎉 ALL CRITICAL TESTS PASSED!');
        console.log('✅ Your portfolio is ready for deployment!');
    } else {
        console.log('\n⚠️  SOME TESTS FAILED');
        console.log('Please fix the failed tests before deploying.');
    }

    // Save detailed report
    const fs = require('fs');
    let report = '# Comprehensive Test Report\n\n';
    report += `**Date:** ${new Date().toLocaleString()}\n\n`;
    report += `## Summary\n\n`;
    report += `- Total Tests: ${total}\n`;
    report += `- ✅ Passed: ${testResults.passed}\n`;
    report += `- ❌ Failed: ${testResults.failed}\n`;
    report += `- ⚠️ Warnings: ${testResults.warnings}\n`;
    report += `- Pass Rate: ${passRate}%\n\n`;

    report += `## Detailed Results\n\n`;
    
    const categories = [...new Set(testResults.tests.map(t => t.category))];
    categories.forEach(category => {
        report += `### ${category}\n\n`;
        const categoryTests = testResults.tests.filter(t => t.category === category);
        categoryTests.forEach(test => {
            const icon = test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️';
            report += `${icon} **${test.test}**`;
            if (test.message) report += `: ${test.message}`;
            report += '\n';
        });
        report += '\n';
    });

    fs.writeFileSync('COMPREHENSIVE-TEST-REPORT.md', report);
    console.log('\n📄 Detailed report saved to: COMPREHENSIVE-TEST-REPORT.md');
}

async function runAllTests() {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║  COMPREHENSIVE PRE-DEPLOYMENT TEST   ║');
    console.log('╚═══════════════════════════════════════╝');

    await testDatabase();
    await testFileSystem();
    await testContentIntegrity();
    await testEnvironment();
    await generateReport();

    await mongoose.connection.close();
}

runAllTests().catch(console.error);
