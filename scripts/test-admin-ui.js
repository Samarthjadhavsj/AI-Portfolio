const fs = require('fs');
const path = require('path');

console.log('\n🧪 TESTING ADMIN UI PAGES\n');
console.log('='.repeat(60));

const results = {
    passed: [],
    failed: [],
    warnings: []
};

// Admin pages to check
const adminPages = [
    'login.html',
    'dashboard.html',
    'home.html',
    'about.html',
    'skills.html',
    'projects.html',
    'coding-profiles.html',
    'experience.html',
    'contact.html'
];

// Check if admin directory exists
if (!fs.existsSync('admin')) {
    console.log('❌ Admin directory not found!');
    process.exit(1);
}

console.log('📁 Checking Admin Pages:\n');

adminPages.forEach(page => {
    const filePath = path.join('admin', page);
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ ${page} - NOT FOUND`);
        results.failed.push(`${page} missing`);
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const checks = {
        hasAuth: content.includes('adminToken') || content.includes('localStorage.getItem'),
        hasAPI: content.includes('/api/') || content.includes('fetch('),
        hasForm: content.includes('<form') || content.includes('onsubmit'),
        hasSidebar: content.includes('sidebar') || page === 'login.html',
        hasViewWebsite: content.includes('View Website') || page === 'login.html' || page === 'dashboard.html'
    };
    
    let status = '✅';
    let issues = [];
    
    // Login page doesn't need all features
    if (page === 'login.html') {
        if (!checks.hasAuth) issues.push('missing auth logic');
        if (!checks.hasForm) issues.push('missing login form');
    } 
    // Dashboard doesn't need forms
    else if (page === 'dashboard.html') {
        if (!checks.hasAuth) issues.push('missing auth check');
        if (!checks.hasSidebar) issues.push('missing sidebar');
    }
    // All other pages need full features
    else {
        if (!checks.hasAuth) issues.push('missing auth check');
        if (!checks.hasAPI) issues.push('missing API calls');
        if (!checks.hasForm) issues.push('missing form');
        if (!checks.hasSidebar) issues.push('missing sidebar');
        if (!checks.hasViewWebsite) issues.push('missing View Website button');
    }
    
    if (issues.length > 0) {
        status = '⚠️';
        results.warnings.push(`${page}: ${issues.join(', ')}`);
    } else {
        results.passed.push(page);
    }
    
    console.log(`${status} ${page}${issues.length > 0 ? ' - ' + issues.join(', ') : ''}`);
});

// Check API helper
console.log('\n📁 Checking Support Files:\n');

const supportFiles = [
    { file: 'api-helper.js', checks: ['getProfile', 'getProjects', 'getSkills', 'getExperience'] },
    { file: 'admin-access.js', checks: ['Ctrl', 'Shift'] },
    { file: 'admin/admin.css', checks: ['.sidebar', '.card', '.form-input'] }
];

supportFiles.forEach(({ file, checks }) => {
    if (!fs.existsSync(file)) {
        console.log(`❌ ${file} - NOT FOUND`);
        results.failed.push(`${file} missing`);
        return;
    }
    
    const content = fs.readFileSync(file, 'utf8');
    const missingChecks = checks.filter(check => !content.includes(check));
    
    if (missingChecks.length > 0) {
        console.log(`⚠️  ${file} - missing: ${missingChecks.join(', ')}`);
        results.warnings.push(`${file}: missing ${missingChecks.join(', ')}`);
    } else {
        console.log(`✅ ${file}`);
        results.passed.push(file);
    }
});

// Check routes
console.log('\n📁 Checking Backend Routes:\n');

if (!fs.existsSync('routes/admin.js')) {
    console.log('❌ routes/admin.js - NOT FOUND');
    results.failed.push('Admin routes missing');
} else {
    const routesContent = fs.readFileSync('routes/admin.js', 'utf8');
    const requiredRoutes = [
        { route: '/profile', methods: ['GET', 'PUT'] },
        { route: '/projects', methods: ['GET', 'POST'] },
        { route: '/projects/:id', methods: ['GET', 'PUT', 'DELETE'] },
        { route: '/skills', methods: ['GET', 'POST'] },
        { route: '/skills/:id', methods: ['GET', 'PUT', 'DELETE'] },
        { route: '/experience', methods: ['GET', 'POST'] },
        { route: '/experience/:id', methods: ['GET', 'PUT', 'DELETE'] },
        { route: '/contacts', methods: ['GET'] },
        { route: '/auth/login', methods: ['POST'] }
    ];
    
    let allRoutesFound = true;
    requiredRoutes.forEach(({ route, methods }) => {
        methods.forEach(method => {
            const routePattern = `router.${method.toLowerCase()}('${route}'`;
            if (!routesContent.includes(routePattern)) {
                console.log(`⚠️  Missing: ${method} ${route}`);
                results.warnings.push(`Route: ${method} ${route}`);
                allRoutesFound = false;
            }
        });
    });
    
    if (allRoutesFound) {
        console.log('✅ All required routes found');
        results.passed.push('Admin routes');
    }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 UI TEST SUMMARY\n');

console.log(`✅ PASSED: ${results.passed.length} checks`);
if (results.passed.length > 0) {
    results.passed.forEach(item => console.log(`   ✓ ${item}`));
}

if (results.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS: ${results.warnings.length} issues`);
    results.warnings.forEach(item => console.log(`   ! ${item}`));
}

if (results.failed.length > 0) {
    console.log(`\n❌ FAILED: ${results.failed.length} critical issues`);
    results.failed.forEach(item => console.log(`   ✗ ${item}`));
}

console.log('\n' + '='.repeat(60));

if (results.failed.length === 0) {
    console.log('\n✅ Admin UI structure looks good!\n');
    if (results.warnings.length > 0) {
        console.log('⚠️  Some warnings found but not critical.\n');
    }
} else {
    console.log('\n❌ Critical issues found! Please fix before deployment.\n');
}

process.exit(results.failed.length === 0 ? 0 : 1);
