const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const auth = require('../MiddleWare/authMiddleware');
const checkRole = require('../MiddleWare/roleMiddleware');

// Create Employee Account
router.post('/create-employee', auth, checkRole(['admin']), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: 'employee',
  });

  await user.save();
  res.send(user);
});

// Delete Employee Account
router.delete('/delete-employee/:id', auth, checkRole(['admin']), async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send('User not found.');
  res.send(user);
});

// View All Tickets
router.get('/all-tickets', [auth, checkRole(['admin'])], async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
});

// Assign Employee to Ticket
router.put('/assign-ticket/:ticketId', auth, checkRole(['admin']), async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    { assignedEmployee: req.body.employeeId },
    { new: true }
  );
  if (!ticket) return res.status(404).send('Ticket not found.');
  res.send(ticket);
});

// Override Ticket Assignment
router.put('/override-ticket/:ticketId', auth, checkRole(['admin']), async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    { assignedEmployee: req.body.employeeId },
    { new: true }
  );
  if (!ticket) return res.status(404).send('Ticket not found.');
  res.send(ticket);
});

module.exports = router;
