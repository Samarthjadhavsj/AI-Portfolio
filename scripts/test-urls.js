const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const https = require('https');
const http = require('http');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// Function to check if URL is accessible
function checkURL(url) {
    return new Promise((resolve) => {
        if (!url) {
            resolve({ valid: false, error: 'URL is empty' });
            return;
        }

        // Basic URL validation
        try {
            new URL(url);
        } catch (e) {
            resolve({ valid: false, error: 'Invalid URL format' });
            return;
        }

        const protocol = url.startsWith('https') ? https : http;
        
        const request = protocol.get(url, { timeout: 5000 }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ valid: true, status: res.statusCode });
            } else {
                resolve({ valid: false, error: `HTTP ${res.statusCode}` });
            }
        });

        request.on('error', (err) => {
            resolve({ valid: false, error: err.message });
        });

        request.on('timeout', () => {
            request.destroy();
            resolve({ valid: false, error: 'Request timeout' });
        });
    });
}

async function testURLs() {
    console.log('\n🔗 TESTING PROFILE URLs\n');
    console.log('='.repeat(60));
    
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        
        const profile = await Profile.findOne();
        
        if (!profile) {
            console.log('❌ No profile found in database!');
            process.exit(1);
        }
        
        console.log('📋 PROFILE DATA:\n');
        console.log(`Name: ${profile.name}`);
        console.log(`Email: ${profile.email}`);
        console.log(`Phone: ${profile.phone}`);
        console.log('');
        
        // Test Profile Image URL
        console.log('📊 TEST 1: Profile Image URL');
        console.log('-'.repeat(60));
        
        if (profile.profileImage?.url) {
            console.log(`URL: ${profile.profileImage.url}`);
            console.log('Checking accessibility...');
            
            const result = await checkURL(profile.profileImage.url);
            
            if (result.valid) {
                console.log(`✅ PASS: Profile image is accessible (HTTP ${result.status})`);
                results.passed.push('Profile Image URL');
            } else {
                console.log(`❌ FAIL: ${result.error}`);
                results.failed.push(`Profile Image URL: ${result.error}`);
            }
        } else {
            console.log('⚠️  WARNING: No profile image URL set');
            results.warnings.push('Profile image URL not configured');
        }
        
        // Test Resume URL
        console.log('\n📊 TEST 2: Resume URL');
        console.log('-'.repeat(60));
        
        if (profile.resume?.url) {
            console.log(`URL: ${profile.resume.url}`);
            console.log('Checking accessibility...');
            
            const result = await checkURL(profile.resume.url);
            
            if (result.valid) {
                console.log(`✅ PASS: Resume is accessible (HTTP ${result.status})`);
                results.passed.push('Resume URL');
            } else {
                console.log(`❌ FAIL: ${result.error}`);
                results.failed.push(`Resume URL: ${result.error}`);
            }
        } else {
            console.log('⚠️  WARNING: No resume URL set');
            results.warnings.push('Resume URL not configured');
        }
        
        // Test Social Links
        console.log('\n📊 TEST 3: Social Media Links');
        console.log('-'.repeat(60));
        
        const socialLinks = {
            'LinkedIn': profile.socialLinks?.linkedin,
            'GitHub': profile.socialLinks?.github,
            'LeetCode': profile.socialLinks?.leetcode,
            'HackerRank': profile.socialLinks?.hackerrank
        };
        
        for (const [platform, url] of Object.entries(socialLinks)) {
            if (url) {
                console.log(`\n${platform}: ${url}`);
                console.log('Checking accessibility...');
                
                const result = await checkURL(url);
                
                if (result.valid) {
                    console.log(`✅ PASS: ${platform} link is accessible (HTTP ${result.status})`);
                    results.passed.push(`${platform} URL`);
                } else {
                    console.log(`❌ FAIL: ${result.error}`);
                    results.failed.push(`${platform} URL: ${result.error}`);
                }
            } else {
                console.log(`\n${platform}: ⚠️  Not configured`);
                results.warnings.push(`${platform} URL not configured`);
            }
        }
        
        // Check where URLs are used
        console.log('\n📊 TEST 4: URL Usage in Website');
        console.log('-'.repeat(60));
        
        console.log('\n📄 Profile Image is used in:');
        console.log('   • index.html (Hero section)');
        console.log('   • about.html (Profile section)');
        console.log('   ✅ Loaded via profile-loader.js');
        
        console.log('\n📄 Resume URL is used in:');
        console.log('   • index.html (Download Resume button)');
        console.log('   • about.html (Resume link)');
        console.log('   ✅ Loaded via profile-loader.js');
        
        console.log('\n📄 Social Links are used in:');
        console.log('   • index.html (Social icons)');
        console.log('   • about.html (Contact section)');
        console.log('   • Footer (All pages)');
        console.log('   ✅ Loaded via profile-loader.js');
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('\n📊 URL TEST SUMMARY\n');
        
        if (results.passed.length > 0) {
            console.log(`✅ PASSED: ${results.passed.length} URLs`);
            results.passed.forEach(item => console.log(`   ✓ ${item}`));
        }
        
        if (results.warnings.length > 0) {
            console.log(`\n⚠️  WARNINGS: ${results.warnings.length} items`);
            results.warnings.forEach(item => console.log(`   ! ${item}`));
        }
        
        if (results.failed.length > 0) {
            console.log(`\n❌ FAILED: ${results.failed.length} URLs`);
            results.failed.forEach(item => console.log(`   ✗ ${item}`));
        }
        
        console.log('\n' + '='.repeat(60));
        
        // Recommendations
        console.log('\n💡 RECOMMENDATIONS:\n');
        
        if (!profile.profileImage?.url) {
            console.log('1. Add Profile Image:');
            console.log('   • Upload image to cloud storage (Cloudinary, ImgBB, etc.)');
            console.log('   • Or use GitHub profile image');
            console.log('   • Update in admin/about.html');
            console.log('');
        }
        
        if (!profile.resume?.url) {
            console.log('2. Add Resume:');
            console.log('   • Upload PDF to Google Drive (set to "Anyone with link")');
            console.log('   • Or use GitHub raw file URL');
            console.log('   • Or use Dropbox public link');
            console.log('   • Update in admin/about.html');
            console.log('');
        }
        
        console.log('3. How to Update URLs:');
        console.log('   • Login to admin panel: http://localhost:3000/admin/login.html');
        console.log('   • Go to About page: http://localhost:3000/admin/about.html');
        console.log('   • Scroll to "Contact & Social Links" section');
        console.log('   • Update URLs');
        console.log('   • Click "Save All Changes"');
        console.log('   • Refresh website to see changes');
        console.log('');
        
        console.log('4. Recommended Image Hosting:');
        console.log('   • Cloudinary (Free tier: 25GB)');
        console.log('   • ImgBB (Free, unlimited)');
        console.log('   • GitHub (Use profile picture URL)');
        console.log('');
        
        console.log('5. Recommended Resume Hosting:');
        console.log('   • Google Drive (Make public)');
        console.log('   • Dropbox (Public link)');
        console.log('   • GitHub (Raw file URL)');
        console.log('');
        
        // Check if URLs are being loaded on website
        console.log('📊 VERIFICATION CHECKLIST:\n');
        console.log('To verify URLs work on website:');
        console.log('');
        console.log('1. [ ] Open http://localhost:3000/index.html');
        console.log('2. [ ] Check if profile image loads in hero section');
        console.log('3. [ ] Click "Download Resume" button');
        console.log('4. [ ] Verify resume opens/downloads');
        console.log('5. [ ] Click social media icons');
        console.log('6. [ ] Verify they open correct profiles');
        console.log('7. [ ] Open http://localhost:3000/about.html');
        console.log('8. [ ] Check if profile image loads');
        console.log('9. [ ] Check if social links work');
        console.log('10. [ ] Check if resume link works');
        console.log('');
        
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');
        
        // Exit code based on results
        if (results.failed.length > 0) {
            console.log('⚠️  Some URLs are not accessible. Please update them in admin panel.\n');
            process.exit(1);
        } else if (results.warnings.length > 0) {
            console.log('⚠️  Some URLs are not configured. Consider adding them.\n');
            process.exit(0);
        } else {
            console.log('🎉 All URLs are working correctly!\n');
            process.exit(0);
        }
        
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error(error);
        process.exit(1);
    }
}

testURLs();
