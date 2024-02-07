const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  userType: {
    type: String,
    enum: ['Admin', 'User'], // Only accept 'Admin' or 'User' values
    required: true,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
