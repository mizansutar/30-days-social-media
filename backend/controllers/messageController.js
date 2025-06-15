const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/user_model'); // <- Import User model

const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const sender = req.user.id;

    const message = new Message({ conversationId, sender, text });
    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Step 1: Get all conversations where the user is a member
    const conversations = await Conversation.find({ members: userId }).lean();

    if (!conversations.length) {
      return res.status(200).json({ conversations: [] });
    }

    // Step 2: Extract all member IDs (excluding current user)
    const otherUserIds = conversations
      .map(c => c.members.find(id => id.toString() !== userId))
      .filter(Boolean);

    // Step 3: Fetch all those users
    const users = await User.find({ _id: { $in: otherUserIds } }, 'username avatar').lean();

    // Step 4: Merge user data into conversations
    const conversationsWithReceiver = conversations.map((c) => {
      const receiverId = c.members.find(id => id.toString() !== userId);
      const receiver = users.find(u => u._id.toString() === receiverId.toString());

      return {
        ...c,
        receiver: receiver || null
      };
    });
console.log(conversationsWithReceiver)
    res.status(200).json({ conversations: conversationsWithReceiver });

  } catch (err) {
    console.error('Error in getUserConversations:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};


module.exports = {
  sendMessage,
  getMessages,
  getUserConversations,
};
