const express = require('express');
const router = express.Router();
const auth = require('../MiddleWare/authMiddleware');
const Ticket = require('../models/ticketModel');
const { User } = require("../models/userModel");

// Fetch assigned users for the logged-in employee
router.get('/assigned-users', auth, async (req, res) => {
    try {
        console.log('Fetching assigned users for:', req.user._id);

        // Ensuring the User model is referenced correctly
        const tickets = await Ticket.find({ 'assignedEmployee._id': req.user._id }).populate({
            path: 'userId',
            model: User,
            select: 'firstName lastName email'
        });

        console.log('Tickets found:', tickets);

        const assignedUsers = tickets.map(ticket => ticket.userId);
        console.log('Assigned users:', assignedUsers);

        res.json(assignedUsers);
    } catch (error) {
        console.error('Failed to fetch assigned users:', error);
        res.status(500).send('Failed to fetch assigned users');
    }
});

module.exports = router;
