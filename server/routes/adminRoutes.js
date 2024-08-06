const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/userModel');
const bcrypt = require('bcrypt');
const auth = require('../MiddleWare/authMiddleware');
const Ticket = require('../models/ticketModel');


// Middleware to check if user is an admin
const checkAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user || user.role !== 'admin') {
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
};

// Create Employee Account
router.post('/create-employee', auth, checkAdmin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    role: 'employee',
  });

  await user.save();
  res.send(user);
});

// Delete Employee Account
router.delete('/delete-employee/:id', auth, checkAdmin, async (req, res) => {
    try {
        console.log(`Attempting to delete user with id: ${req.params.id}`); // Log the attempt to delete
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            console.error('User not found with id:', req.params.id); // Log if user is not found
            return res.status(404).send('User not found.');
        }
        console.log('User deleted:', user); // Log the deleted user
        res.send(user);
    } catch (error) {
        console.error('Error deleting employee:', error); // Detailed error log
        res.status(500).send('Error deleting employee');
    }
});
// View All Tickets
router.get('/all-tickets', auth, checkAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
});

// Assign Employee to Ticket
router.put('/assign-ticket/:ticketId', auth, checkAdmin, async (req, res) => {
    try {
      const employee = await User.findById(req.body.employeeId);
      if (!employee) {
        return res.status(404).send('Employee not found.');
      }
  
      const ticket = await Ticket.findById(req.params.ticketId);
      if (!ticket) {
        return res.status(404).send('Ticket not found.');
      }
  
      ticket.assignedEmployee = {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName
      };
  
      await ticket.save();
  
      res.send(ticket);
    } catch (error) {
      console.error('Error assigning employee to ticket:', error);
      res.status(500).send('Error assigning employee to ticket');
    }
  });
  
  
  

// Override Ticket Assignment
router.put('/override-ticket/:ticketId', auth, checkAdmin, async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    { assignedEmployee: req.body.employeeId },
    { new: true }
  );
  if (!ticket) return res.status(404).send('Ticket not found.');
  res.send(ticket);
});

// Create Employee Account with hashed password
router.post('/add-employee', auth, checkAdmin, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: 'employee',
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).send('Error adding employee');
  }
});

router.get('/all-employees', auth, checkAdmin, async (req, res) => {
    try {
      const employees = await User.find({ role: 'employee' });
      res.send(employees);
    } catch (error) {
      res.status(500).send('Error fetching employees');
    }
  });


  router.put('/update-ticket-status/:ticketId', auth, async (req, res) => {
    const { status, assignedEmployee } = req.body;
    const { ticketId } = req.params;

    console.log(`Received ticketId: ${ticketId}`);

    try {
        const updateData = { status };
        if (assignedEmployee) {
            updateData.assignedEmployee = assignedEmployee;
        }

        const ticket = await Ticket.findByIdAndUpdate(
            ticketId,
            updateData,
            { new: true }
        );

        if (!ticket) return res.status(404).send('Ticket not found.');

        res.send(ticket);
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).send('Error updating ticket status');
    }
});





module.exports = router;
