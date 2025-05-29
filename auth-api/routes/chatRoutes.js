const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const chatMiddleware = require('../middleware/chatMiddleware'); 

// Routes
router.get('/users', chatMiddleware, chatController.chatUsers);
router.get('/messages/:user1/:user2', chatMiddleware, chatController.getMessages);
router.post('/notify/:user1/:user2', chatController.NotifyAdmin);

module.exports = router;
