const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const studentSchema = new Schema({
  studentId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  image: { type: String }
});

// Create the model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
