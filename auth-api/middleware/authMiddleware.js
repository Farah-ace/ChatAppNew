const jwt = require('jsonwebtoken');
const User = require('../models/User');
const messages = require('../constants/messages')

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: messages.UNAUTHORIZED_USER_ERROR });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: messages.TOKEN_VALIDATION_ERROR });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: messages.ADMIN_ACCESS_ERROR });
  }
  next();
};
