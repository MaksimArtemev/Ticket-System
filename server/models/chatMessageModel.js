const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    ticketId: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added receiverId
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', messageSchema);
module.exports = ChatMessage;
