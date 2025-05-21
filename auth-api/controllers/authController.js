const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// import sendEmail from '../utils/sendEmail.js'
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name, email, password: hashed, role, otp, otpExpiry: Date.now() + 10 * 60 * 1000
    });

    await sendEmail(email, 'Verify Your Account', `Your verification OTP is ${otp}`);
    res.status(201).json({ message: 'Registration successful. Please verify email using OTP.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ message: 'Email verified successfully' });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('Request Body:', req.body);
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: 'Email is invalid' });

    if (!user.isVerified) {
      return res.status(403).json({ error: 'Please verify your email first' });

    }

    const isMatch = await bcrypt.compare(password, user.password);
    //console.log('Password matches:', isMatch);
    if (!isMatch) return res.status(401).json({ error: 'Password is invalid' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail(email, 'OTP for Password Reset', `Your OTP is ${otp}`);
  res.json({ message: 'OTP sent to email' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ message: 'Password reset successful' });
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json(updatedUser);
};
