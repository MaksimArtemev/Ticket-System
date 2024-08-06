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
        const messages = await ChatMessage.find({ receiverId: req.params.employeeId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error });
    }
});

// Send a message to a specific employee
router.post('/messages/:employeeId', auth, async (req, res) => {
    try {
        const newMessage = new ChatMessage({
            ticketId: req.body.ticketId,  // Ensure you send ticketId from the client if needed
            senderId: req.user._id,
            receiverId: req.params.employeeId, // Added receiverId
            message: req.body.message,
            timestamp: Date.now()
        });
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error });
    }
});

module.exports = router;
