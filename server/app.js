const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
const corsOptions = {
    origin: "http://localhost:3000"//"https://ticket-system-front-end.onrender.com"//"http://localhost:3000" //"https://ticket-system-front-end.onrender.com" // frontend URI (ReactJS) //
}
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const ticketSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: [String],
    clientID: { //unique ID of client account that created the ticket
        type: String,
        required: true
    },

});

const User = mongoose.model('User', userSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

// Set up multer for file uploads (CHAT GPT)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// route
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.post("/tickets", upload.array('files'), async (req, res) => {
    const newTicket = new Ticket({
        topic: req.body.topic,
        subject: req.body.subject,
        description: req.body.description,
        files: req.files.map(file => file.path),
        clientID: req.body.clientID
    });
    try {
        const savedTicket = await newTicket().save();
        res.status(201).send(savedTicket);
        res.redirect('/tickets');
    } catch (err) {
        res.status(400).send(err);
    }
});