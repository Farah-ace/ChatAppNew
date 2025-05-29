// createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Mongo = `mongodb://localhost:27017/authdb`;


mongoose.connect(Mongo).then(async () => {
  const password = await bcrypt.hash('admin123', 10);
  const admin = await User.create({
    name: 'Admin',
    email: 'farahlasharibaloch@gmail.com',
    password,
    isVerified: true,
    role: 'admin'
  });
  console.log('Admin user created:', admin.email);
  process.exit();
});
