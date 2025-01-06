require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./models/User'); // Import the User model
const Scholarship = require('./models/Scholarship'); // Import the Scholarship model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, JS from the 'public' directory

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { 
      fullName, 
      dateOfBirth, 
      age, 
      phoneNumber, 
      email, 
      educationLevel, 
      income, 
      gender, 
      religion, 
      caste, 
      state, 
      district, 
      password 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      dateOfBirth,
      age,
      phoneNumber,
      email,
      educationLevel,
      income,
      gender,
      religion,
      caste,
      state,
      district,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error during signup' });
  }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If credentials are valid, redirect to scholarship.html
        res.status(200).json({ message: 'Login successful', redirectUrl: '/scholarship.html' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all scholarships
app.get('/scholarships/all', async (req, res) => {
  try {
    const scholarships = await Scholarship.find(); // Fetch all scholarships from the database
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching all scholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships' });
  }
});

// Fetch eligible scholarships
app.get('/scholarships/eligible', async (req, res) => {
  const {
    educationLevel,
    annualIncome,
    gender,
    religion,
    caste,
    state,
    district
  } = req.query;

  try {
    // Fetch scholarships from the database and apply filters based on user input
    const scholarships = await Scholarship.find({
      $and: [
        { 'eligibility.educationLevel': { $in: [educationLevel] } }, // Check education level
        { 'eligibility.annualIncomeLessThan': { $gt: annualIncome } }, // Check income
        { 'eligibility.gender': { $in: ['Any', gender] } }, // Check gender (Any or specific)
        { 'eligibility.religion': { $in: [religion, null] } }, // Check religion (null or specific)
        { 'eligibility.caste': { $in: [caste, null] } }, // Check caste (null or specific)
        { 'eligibility.state': { $in: [state, null] } }, // Check state (null or specific)
        { 'eligibility.district': { $in: [district, null] } } // Check district (null or specific)
      ]
    });

    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching eligible scholarships:', error);
    res.status(500).json({ message: 'Error fetching eligible scholarships' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
