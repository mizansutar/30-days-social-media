const express = require('express');
const auth = require('../midleWares/UserMidel');
const {  recommendationUser} = require('../controllers/user_controllers.js');
const {
  sendMessage,
  getMessages,
  getUserConversations
} = require('../controllers/messageController');

const router = express.Router();

router.post('/send', auth, sendMessage);
router.get('/:conversationId', auth, getMessages);
router.get('/conversations/list', auth, recommendationUser);

module.exports = router;
