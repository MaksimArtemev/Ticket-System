const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('./models/userModel'); // Adjust the path according to your project structure

// Replace with your MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://maxielife:9SmwSAJkAeNn1b7k@ticketsystemcluster.j5yskhc.mongodb.net/?retryWrites=true&w=majority&appName=TicketSystemCluster';

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Check if an admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      mongoose.disconnect();
      return;
    }

    // Create a new admin user
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('Adminpassword1@', salt); // Replace with your desired admin password

    const admin = new User({
        firstName: 'Mark',
        lastName: 'Zuckerberg',
        email: 'MarkZuck@gmail.com', // Replace with your desired admin email
        password: password,
        role: 'admin',
      });
  

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();