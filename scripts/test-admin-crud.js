const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Admin = require('../models/Admin');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testAdminCRUD() {
    console.log('\n🧪 TESTING ADMIN CRUD OPERATIONS\n');
    console.log('='.repeat(60));
    
    const results = {
        passed: [],
        failed: []
    };
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        
        // ========================================
        // TEST 1: PROFILE (Home & About)
        // ========================================
        console.log('📝 TEST 1: PROFILE OPERATIONS');
        console.log('-'.repeat(60));
        
        try {
            // READ
            const profile = await Profile.findOne();
            if (!profile) throw new Error('No profile found');
            console.log('✅ READ: Profile loaded');
            
            // UPDATE
            const originalName = profile.name;
            profile.name = 'TEST NAME';
            await profile.save();
            console.log('✅ UPDATE: Profile name updated');
            
            // VERIFY UPDATE
            const updatedProfile = await Profile.findOne();
            if (updatedProfile.name !== 'TEST NAME') throw new Error('Update verification failed');
            console.log('✅ VERIFY: Update confirmed');
            
            // RESTORE
            profile.name = originalName;
            await profile.save();
            console.log('✅ RESTORE: Original data restored');
            
            results.passed.push('Profile CRUD');
        } catch (error) {
            console.log('❌ FAILED:', error.message);
            results.failed.push(`Profile CRUD: ${error.message}`);
        }
        
        // ========================================
        // TEST 2: PROJECTS
        // ========================================
        console.log('\n📝 TEST 2: PROJECTS OPERATIONS');
        console.log('-'.repeat(60));
        
        try {
            // READ ALL
            const projects = await Project.find();
            console.log(`✅ READ: Found ${projects.length} projects`);
            
            // CREATE
            const testProject = await Project.create({
                title: 'TEST PROJECT - DELETE ME',
                description: 'This is a test project',
                tags: ['Test', 'CRUD'],
                githubUrl: 'https://github.com/test',
                status: 'published',
                order: 999
            });
            console.log('✅ CREATE: Test project created');
            
            // READ ONE
            const foundProject = await Project.findById(testProject._id);
            if (!foundProject) throw new Error('Created project not found');
            console.log('✅ READ ONE: Project found by ID');
            
            // UPDATE
            testProject.title = 'UPDATED TEST PROJECT';
            await testProject.save();
            const updatedProject = await Project.findById(testProject._id);
            if (updatedProject.title !== 'UPDATED TEST PROJECT') throw new Error('Update failed');
            console.log('✅ UPDATE: Project updated');
            
            // DELETE
            await Project.findByIdAndDelete(testProject._id);
            const deletedProject = await Project.findById(testProject._id);
            if (deletedProject) throw new Error('Delete failed');
            console.log('✅ DELETE: Test project deleted');
            
            results.passed.push('Projects CRUD');
        } catch (error) {
            console.log('❌ FAILED:', error.message);
            results.failed.push(`Projects CRUD: ${error.message}`);
        }
        
        // ========================================
        // TEST 3: SKILLS
        // ========================================
        console.log('\n📝 TEST 3: SKILLS OPERATIONS');
        console.log('-'.repeat(60));
        
        try {
            // READ ALL
            const skills = await Skill.find();
            console.log(`✅ READ: Found ${skills.length} skill categories`);
            
            // CREATE
            const testSkill = await Skill.create({
                category: 'TEST CATEGORY',
                icon: 'code',
                skills: ['Test Skill 1', 'Test Skill 2'],
                order: 999
            });
            console.log('✅ CREATE: Test skill category created');
            
            // READ ONE
            const foundSkill = await Skill.findById(testSkill._id);
            if (!foundSkill) throw new Error('Created skill not found');
            console.log('✅ READ ONE: Skill found by ID');
            
            // UPDATE
            testSkill.category = 'UPDATED TEST CATEGORY';
            testSkill.skills.push('Test Skill 3');
            await testSkill.save();
            const updatedSkill = await Skill.findById(testSkill._id);
            if (updatedSkill.category !== 'UPDATED TEST CATEGORY') throw new Error('Update failed');
            if (updatedSkill.skills.length !== 3) throw new Error('Skills array update failed');
            console.log('✅ UPDATE: Skill category and skills updated');
            
            // DELETE
            await Skill.findByIdAndDelete(testSkill._id);
            const deletedSkill = await Skill.findById(testSkill._id);
            if (deletedSkill) throw new Error('Delete failed');
            console.log('✅ DELETE: Test skill deleted');
            
            results.passed.push('Skills CRUD');
        } catch (error) {
            console.log('❌ FAILED:', error.message);
            results.failed.push(`Skills CRUD: ${error.message}`);
        }
        
        // ========================================
        // TEST 4: EXPERIENCE
        // ========================================
        console.log('\n📝 TEST 4: EXPERIENCE OPERATIONS');
        console.log('-'.repeat(60));
        
        try {
            // READ ALL
            const experiences = await Experience.find();
            console.log(`✅ READ: Found ${experiences.length} experience entries`);
            
            // CREATE - Education
            const testEducation = await Experience.create({
                type: 'education',
                title: 'TEST DEGREE',
                organization: 'Test University',
                period: '2020-2024',
                description: 'Test education entry',
                order: 999
            });
            console.log('✅ CREATE: Test education created');
            
            // CREATE - Internship
            const testInternship = await Experience.create({
                type: 'internship',
                title: 'TEST INTERN',
                organization: 'Test Company',
                period: 'Jan 2024 - Present',
                description: 'Test internship entry',
                order: 999
            });
            console.log('✅ CREATE: Test internship created');
            
            // CREATE - Achievement
            const testAchievement = await Experience.create({
                type: 'achievement',
                title: 'TEST ACHIEVEMENT',
                organization: 'Test Organization',
                period: '2024',
                description: 'Test achievement entry',
                link: 'https://test.com',
                order: 999
            });
            console.log('✅ CREATE: Test achievement created');
            
            // CREATE - Certification
            const testCertification = await Experience.create({
                type: 'certification',
                title: 'TEST CERTIFICATION',
                organization: 'Test Provider',
                period: '2024',
                description: 'Test certification entry',
                order: 999
            });
            console.log('✅ CREATE: Test certification created');
            
            // UPDATE
            testEducation.title = 'UPDATED TEST DEGREE';
            await testEducation.save();
            const updatedExp = await Experience.findById(testEducation._id);
            if (updatedExp.title !== 'UPDATED TEST DEGREE') throw new Error('Update failed');
            console.log('✅ UPDATE: Experience updated');
            
            // DELETE ALL TEST ENTRIES
            await Experience.deleteMany({ order: 999 });
            const remainingTests = await Experience.find({ order: 999 });
            if (remainingTests.length > 0) throw new Error('Delete failed');
            console.log('✅ DELETE: All test experiences deleted');
            
            results.passed.push('Experience CRUD');
        } catch (error) {
            console.log('❌ FAILED:', error.message);
            results.failed.push(`Experience CRUD: ${error.message}`);
        }
        
        // ========================================
        // TEST 5: ADMIN AUTHENTICATION
        // ========================================
        console.log('\n📝 TEST 5: ADMIN AUTHENTICATION');
        console.log('-'.repeat(60));
        
        try {
            // READ
            const admin = await Admin.findOne();
            if (!admin) throw new Error('No admin account found');
            console.log('✅ READ: Admin account found');
            
            // VERIFY PASSWORD
            const isValid = await admin.comparePassword(process.env.ADMIN_PASSWORD || 'Sam@2003');
            if (!isValid) throw new Error('Password verification failed');
            console.log('✅ VERIFY: Password check working');
            
            results.passed.push('Admin Authentication');
        } catch (error) {
            console.log('❌ FAILED:', error.message);
            results.failed.push(`Admin Authentication: ${error.message}`);
        }
        
        // ========================================
        // SUMMARY
        // ========================================
        console.log('\n' + '='.repeat(60));
        console.log('\n📊 TEST SUMMARY\n');
        
        console.log(`✅ PASSED: ${results.passed.length} tests`);
        results.passed.forEach(test => console.log(`   ✓ ${test}`));
        
        if (results.failed.length > 0) {
            console.log(`\n❌ FAILED: ${results.failed.length} tests`);
            results.failed.forEach(test => console.log(`   ✗ ${test}`));
        }
        
        console.log('\n' + '='.repeat(60));
        
        if (results.failed.length === 0) {
            console.log('\n🎉 ALL TESTS PASSED! Admin CRUD operations working correctly.\n');
        } else {
            console.log('\n⚠️  SOME TESTS FAILED! Please review the errors above.\n');
        }
        
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');
        
        process.exit(results.failed.length === 0 ? 0 : 1);
        
    } catch (error) {
        console.error('\n❌ CRITICAL ERROR:', error.message);
        console.error(error);
        process.exit(1);
    }
}

testAdminCRUD();
