// server/ChatMessage.js
//This file defines the Mongoose schema and model for chat messages.


const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatMessageSchema = new mongoose.Schema({
  ticketId: { type: String, required: true },
  messages: [messageSchema]
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
