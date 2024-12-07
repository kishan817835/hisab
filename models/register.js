const mongoose = require('../db'); // Use the centralized connection from db.js

// Define the Login Schema
const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  password: {
    type: String,
    required: true
  },
});

// Create the Login model
const Login = mongoose.model('Login', LoginSchema);

module.exports = Login;
