const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
const corsOptions = {
    origin: "http://localhost:3000"//"https://ticket-system-front-end.onrender.com"//"http://localhost:3000" //"https://ticket-system-front-end.onrender.com" // frontend URI (ReactJS) //
}

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

const ticketSchema = new mongoose.Schema({
    topic: {
        type: String,
    },
    subject: {
        type: String,
    },
    description: {
        type: String,
    },
    clientID: { //unique ID of client account that created the ticket
        type: String,
    },

});
const Ticket = mongoose.model('Ticket', ticketSchema);


// routes
app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.post('/tickets', async (req, res) => {
    const ticketTopic = req.body.topic;
    const ticketSubject = req.body.subject;
    const ticketDesc = req.body.description;
    const id = "123"; // <==== replace this with a real user ID

    // TODO: integrate files from form into database

    try{
        const t = new Ticket({
            topic: ticketTopic, 
            subject: ticketSubject, 
            description: ticketDesc, 
            clientID: id});
        await t.save();
    } catch (err) {
        console.log(err);
    }
});

app.get("/tickets", (req, res) => {S
    Ticket.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.json(err));
});

