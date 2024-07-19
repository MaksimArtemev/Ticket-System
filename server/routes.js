const express = require('express');
const router = express.Router();
const ChatMessage = require('./chatMessage');

// Fetching chat messages
router.get('/tickets/:ticketId/chat', async (req, res) => {
  const { ticketId } = req.params;
  try {
    const chat = await ChatMessage.findOne({ ticketId });
    res.json(chat ? chat.messages : []);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching chat messages' });
  }
});

// Sending a chat message
router.post('/tickets/:ticketId/chat', async (req, res) => {
  const { ticketId } = req.params;
  const { senderId, message } = req.body;
  const newMessage = { senderId, message, timestamp: new Date() };

  try {
    let chat = await ChatMessage.findOne({ ticketId });

    if (!chat) {
      chat = new ChatMessage({ ticketId, messages: [newMessage] });
    } else {
      chat.messages.push(newMessage);
    }

    await chat.save();
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the chat message' });
  }
});

module.exports = router;
