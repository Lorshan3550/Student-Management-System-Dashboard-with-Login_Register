const Student = require("../model/student");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const getAllStudents = async (req, res) => {
  let students;
  try {
    students = await Student.find();
  } catch (error) {
    console.error("Error finding students:", error);
    res.status(500).json({ error: "Internal server error" });
  }

  if (!students) {
    res.status(404).json({ message: "No students Found" });
  }

  // Respond with them
  res.json({ students });
};

const getStudent = async (req, res) => {
  let student;
  const {Id} = req.params
  try {
    student = await Student.findOne({ studentId : Id});
  } catch (error) {
    console.error("Error finding students:", error);
    res.status(500).json({ error: "Internal server error" });
  }

  if (!student) {
    res.status(404).json({ message: "No student Found" });
  }

  // Respond with them
  res.json({ student });
};


const createStudent = async (req, res) => {
  try {
    const { studentId, firstName, lastName, age } = req.body;
    const pdfFilePath = req.file.path;

    const newStudent = new Student({
      studentId,
      firstName,
      lastName,
      age,
      image: pdfFilePath,
    });
    await newStudent.save();

    res.status(201).json({
      message: "Student Created successfully",
      student: newStudent,
      img: req.file,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { Id } = req.params;
    const { firstName, lastName, age, status } = req.body;
    const pdfFilePath = req.file ? req.file.path : undefined;

    // Check if the student with the given studentId exists
    let student = await Student.findOne({ studentId: Id });

    if (!student) {
      res.status(404).json({ error: "No student found" });
    }

    // Update the student properties if they are provided in the request
    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (age) student.age = age;
    if (status) student.status = status;
    if (pdfFilePath) student.image = pdfFilePath;

    await student.save();

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    // Extract the Id parameter from the request
    const { Id } = req.params;

    // Find and delete the student based on the Id
    const deletedStudent = await Student.findOneAndDelete({ studentId: Id });

    // Check if a student with the provided Id exists
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    
    // Send a success response
    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    console.log("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
