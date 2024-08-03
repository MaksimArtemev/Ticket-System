const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./db");
const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Database connection
connection();

// Middleware
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App is Listening on PORT ${PORT}`));

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});
