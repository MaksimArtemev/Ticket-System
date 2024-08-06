const router = require("express").Router();
const { User, validate } = require("../models/userModel");
const ChatMessage = require('../models/chatMessageModel');
const bcrypt = require("bcrypt");
const auth = require("../MiddleWare/authMiddleware");

// Register new user
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();

        const token = newUser.generateAuthToken();
        res.status(201).send({ data: token, message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

// Fetch all employees
router.get('/employees', auth, async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('firstName lastName');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees', error });
    }
});

// Fetch messages for a specific employee
router.get('/messages/:employeeId', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ 'assignedEmployee._id': req.params.employeeId }).select('_id');
        const ticketIds = tickets.map(ticket => ticket._id);
        const messages = await ChatMessage.find({ ticketId: { $in: ticketIds } });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages for employee', error });
    }
});

// Send a message to a specific employee
router.post('/messages/:employeeId', auth, async (req, res) => {
    try {
      const { ticketId, message } = req.body;
  
      // Ensure the ticket is assigned to the employee
      const ticket = await Ticket.findOne({ _id: ticketId, 'assignedEmployee._id': req.params.employeeId });
      if (!ticket) {
        return res.status(403).json({ message: 'You are not authorized to message on this ticket.' });
      }
  
      const newMessage = new ChatMessage({
        ticketId,
        senderId: req.user._id,
        receiverId: req.params.employeeId,
        message,
        timestamp: Date.now()
      });
  
      await newMessage.save();
      res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: 'Failed to send message', error });
    }
  });
module.exports = router;