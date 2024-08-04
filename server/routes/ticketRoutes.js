const express = require('express');
const router = express.Router();
const multer = require('multer');
const Ticket = require('../models/ticketModel');
const { User } = require('../models/userModel'); // Ensure correct import
const auth = require('../MiddleWare/authMiddleware');

const upload = multer({ dest: 'uploads/' });

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
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Error creating ticket', error });
  }
});

router.get('/user-tickets', auth, async (req, res) => {
  try {
    console.log('Fetching tickets for user ID:', req.user._id);
    const tickets = await Ticket.find({ userId: req.user._id });
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error('User not found for ID:', req.user._id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User Role:', user.role); // Log user role
    const ticketsWithRole = tickets.map(ticket => ({
      ...ticket._doc,
      role: user.role // Include role from user
    }));
    res.status(200).json(ticketsWithRole);
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Error fetching tickets', error: error.message, stack: error.stack });
  }
});

module.exports = router;
