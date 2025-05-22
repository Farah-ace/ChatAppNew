// createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const password = await bcrypt.hash('admin123', 10);
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password,
    isVerified: true,
    role: 'admin'
  });
  console.log('Admin user created:', admin.email);
  process.exit();
});
