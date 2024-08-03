// routes/tickets.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Ticket = require('../models/ticketModel');
const auth = require('../MiddleWare/authMiddleware');

const upload = multer({ dest: 'uploads/' }); // Configure as needed

router.post('/', auth, upload.array('files'), async (req, res) => {
  const { topic, subject, description } = req.body;
  const files = req.files.map(file => file.path);

  try {
    const newTicket = await Ticket.create({
      userId: req.user._id,
      topic,
      subject,
      description,
      files,
    });
    res.status(201).json({ ticketID: newTicket.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
});

router.get('/user-tickets', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
});

module.exports = router;
