const User = require('../models/User');
const Message = require('../models/Message')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const sendEmail = require('../utils/sendEmail');
const messages = require('../constants/messages');

exports.chatUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
      role: { $ne: 'admin' }
    }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR });
  }
};


exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: messages.MESSAGE_FETCH_ERROR });
  }
};
exports.NotifyAdmin = async (req, res) => {
  const { user1, user2 } = req.params;
  const email = process.env.ADMIN_EMAIL;
  console.log(email);
  
  try {
    // fetch full user details from DB if needed to make email more understanable
    // const userOne = await User.findById(user1);
    // const userTwo = await User.findById(user2);

    await sendEmail(
      email,
      messages.BAD_WORDS_USED,
      `${messages.BAD_WORDS_USED} between User1 ID: ${user1} and User2 ID: ${user2}`
    );
    res.status(200).json({ message: messages.ADMIN_NOTIFIED });

  } catch (err) {
    res.status(500).json({ error: messages.ADMIN_NOTIFICATION_FAILED });
  }
};



