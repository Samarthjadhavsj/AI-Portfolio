const crypto = require('crypto');

console.log('\n🔐 GENERATING SECURE JWT SECRET\n');
console.log('Copy this secret and update your .env file:\n');
console.log('JWT_SECRET=' + crypto.randomBytes(64).toString('hex'));
console.log('\n⚠️  Keep this secret secure and never commit it to Git!\n');
