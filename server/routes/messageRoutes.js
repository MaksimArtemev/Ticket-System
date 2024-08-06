const express = require('express');
const router = express.Router();
const auth = require('../MiddleWare/authMiddleware');
const ChatMessage = require('../models/chatMessageModel');

// Send a message
router.post('/send', auth, async (req, res) => {
    const { receiverId, senderId, ticketId, message } = req.body;

    try {
        const newMessage = new ChatMessage({
            senderId,
            receiverId,
            ticketId,
            message,
        });

        await newMessage.save();
        res.status(201).send(newMessage);
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).send('Failed to send message');
    }
});


// Get messages between two users
router.get('/conversation/:recipientId', auth, async (req, res) => {
    const senderId = req.user._id;
    const { recipientId } = req.params;

    try {
        const messages = await ChatMessage.find({
            $or: [
                { sender: senderId, recipient: recipientId },
                { sender: recipientId, recipient: senderId },
            ],
        }).sort('createdAt');

        res.status(200).send(messages);
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        res.status(500).send('Failed to fetch messages');
    }
});

module.exports = router;
