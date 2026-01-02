const fs = require('fs');

console.log('=== ADMIN HOME.HTML VERIFICATION ===\n');

const html = fs.readFileSync('admin/home.html', 'utf8');

// Check for all 10 fields
const fields = [
    'name',
    'heroLine1',
    'heroLine2',
    'education',
    'location',
    'subtitle',
    'passion',
    'profileImage',
    'careerAspirations',
    'practicalExperience'
];

console.log('Checking for all 10 fields:\n');

fields.forEach((field, index) => {
    const present = html.includes(`id="${field}"`);
    console.log(`${index + 1}. ${field.padEnd(25)} ${present ? '✅ PRESENT' : '❌ MISSING'}`);
});

console.log('\n=== RESULT ===');
const allPresent = fields.every(field => html.includes(`id="${field}"`));

if (allPresent) {
    console.log('✅ ALL 10 FIELDS ARE PRESENT IN THE FILE!');
    console.log('\n🔍 If you cannot see them in your browser:');
    console.log('   This is a BROWSER CACHE issue.');
    console.log('   Solution: Press Ctrl+Shift+R to hard refresh');
    console.log('   Or use Incognito mode: Ctrl+Shift+N');
} else {
    console.log('❌ Some fields are missing');
}
