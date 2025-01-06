const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: String,
  provider: String,
  description: String,
  eligibility: {
    educationLevel: [String], // Array of education levels (e.g., ["Undergraduate", "Postgraduate"])
    annualIncomeLessThan: Number,
    gender: String, // Gender criteria (e.g., "Male", "Female", "Any")
    religion: String, // Null or a specific religion
    caste: String, // Null or a specific caste
    state: String, // Null or a specific state
    district: String, // Null or a specific district
  },
  amount: Number,
  deadline: Date,
  logo: String,
  applyLink: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
module.exports = Scholarship;
