const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const messages = require('../constants/messages')
const sendEmail = require('../utils/sendEmail');


exports.register = async (req, res) => {
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: messages.EMAIL_ALREADY_REGISTERED_ERROR });

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      userName, email, password: hashed, role, otp, otpExpiry: Date.now() + 10 * 60 * 1000
    });

  
    await sendEmail(email, messages.VERIFY_ACCOUNT, `${messages.OTP_MESSAGE}${otp}`);
    res.status(201).json({ message: messages.USER_REGISTERED_SUCCESS });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: messages.OTP_VALIDATION_ERROR });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ message: messages.EMAIL_VERIFICATION_SUCCESS });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('Request Body:', req.body);
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: messages.INVALID_EMAIL_ERROR });

    if (!user.isVerified) {
      return res.status(403).json({ error: messages.EMAIL_VERIFICATION_ERROR});

    }

    const isMatch = await bcrypt.compare(password, user.password);
    //console.log('Password matches:', isMatch);
    if (!isMatch) return res.status(401).json({ error: messages.INVALID_PASSWORD_ERROR });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  }
  catch (error) {
    res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: messages.USER_NOT_EXIST_ERROR });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail(email, messages.RESET_PASSWORD_OTP, `${messages.OTP_MESSAGE}${otp}`);
  res.json({ message: messages.OTP_SENT });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: messages.OTP_VALIDATION_ERROR });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ message: messages.PASSWORD_RESET_SUCCESS });
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
