const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel');
const auth = require('../MiddleWare/authMiddleware');
const checkRoles = require('../MiddleWare/roleMiddleware');

router.get('/employee-tickets', [auth, checkRoles(['employee'])], async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
});

module.exports = router;
