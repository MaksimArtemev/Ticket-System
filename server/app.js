const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const chatRoutes = require('./routes'); // Import routes
const ChatMessage = require('./chatMessage'); // Import ChatMessage model

// Middleware
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

// Connect MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => { // Change app.listen to server.listen
        console.log(`App is Listening on PORT ${PORT}`);
    });
}).catch(err => {
    console.log(err);
});

// Route
app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});

// Use the chat routes
app.use('/api', chatRoutes);

app.get("/test-connection", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.status(200).json({ message: "Successfully connected to MongoDB" });
    } catch (error) {
        res.status(500).json({ message: "Failed to connect to MongoDB", error });
    }
});

// WebSocket setup
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (ticketId) => {
        socket.join(ticketId);
    });

    socket.on('sendMessage', async (data) => {
        const { ticketId, senderId, message } = data;
        const newMessage = { senderId, message, timestamp: new Date() };

        try {
            let chat = await ChatMessage.findOne({ ticketId });

            if (!chat) {
                chat = new ChatMessage({ ticketId, messages: [newMessage] });
            } else {
                chat.messages.push(newMessage);
            }

            await chat.save();
            io.to(ticketId).emit('receiveMessage', newMessage);
        } catch (error) {
            console.error('Error while sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = app;
