// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  files: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'open' }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
