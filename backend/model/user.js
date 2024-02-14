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
    minlength: 8,
  },
  userType: {
    type: String,
    enum: ['Admin', 'User'], // Only accept 'Admin' or 'User' values
    default : 'Admin'
  },
  googleId: {
    type: String,
    unique: true,
    sparse : true
  },
  displayName:String,
  image: String
  
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
