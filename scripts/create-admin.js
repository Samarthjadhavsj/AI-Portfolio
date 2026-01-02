// Create admin user
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    console.log('🔐 Creating admin user...\n');

    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'samarthjadhavsj121@gmail.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}\n`);
      console.log('💡 To reset password, delete the admin and run this script again.\n');
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL || 'samarthjadhavsj121@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Samarth A Jadhav',
      role: 'super_admin'
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'admin123');
    console.log('👤 Name:', admin.name);
    console.log('🎭 Role:', admin.role);
    console.log('\n⚠️  IMPORTANT: Change your password after first login!\n');
    console.log('🔗 Login at: http://localhost:3000/admin/login.html\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin:', error);
    process.exit(1);
  }
};

createAdmin();
