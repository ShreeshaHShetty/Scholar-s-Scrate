const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  educationLevel: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
