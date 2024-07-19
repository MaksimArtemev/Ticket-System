// const mongoose = require("mongoose");
// const {connection} = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./db")
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');



//db connection
connection();

// middleware
const corsOptions = {
    origin: "http://localhost:3000"//"https://ticket-system-front-end.onrender.com"//"http://localhost:3000" //"https://ticket-system-front-end.onrender.com" // frontend URI (ReactJS) //
}
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`App is Listening on PORT ${PORT}`));

// route
// app.get("/", (req, res) => {
//     res.status(201).json({message: "Connected to Backend!"});
// });

// connect MongoDB

// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     const PORT = process.env.PORT || 8000
//     app.listen(PORT, () => {
//         console.log(`App is Listening on PORT ${PORT}`);
//     })
// }).catch(err => {
//     console.log(err);
// });
