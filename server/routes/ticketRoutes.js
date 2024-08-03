// routes/tickets.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Ticket = require('../models/Ticket');

const upload = multer({ dest: 'uploads/' }); // Configure as needed

router.post('/', upload.array('files'), async (req, res) => {
  const { topic, subject, description } = req.body;
  const files = req.files.map(file => file.path);

  try {
    const newTicket = await Ticket.create({
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

module.exports = router;
