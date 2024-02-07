const express = require("express");
const {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/StudentController");
const {upload, upload1} = require("../middleware/fileStorageMiddleware")
const {deleteImage} = require("../middleware/fileDeleteMiddleware")




const studentRouter = express.Router();

studentRouter.get("/students", getAllStudents);
studentRouter.get("/student/:Id", getStudent);
studentRouter.post("/student", upload.single("image"), createStudent);
studentRouter.patch("/student/:Id", deleteImage ,upload1.single("image"), updateStudent);
studentRouter.delete("/student/:Id", deleteImage ,deleteStudent )

module.exports = { studentRouter };
