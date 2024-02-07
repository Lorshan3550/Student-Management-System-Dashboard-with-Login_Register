const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(__dirname);
      // console.log("myPath",myPath)
      // console.log("myPath",path1)
      // const uploadPath = path.join(__dirname, "../../frontend/");
      // const uploadPath1 = path.join(path1, "/frontend/src/assets/images/StudentImages/");
      // console.log("UploadPath 1" , uploadPath1)
      cb(null, "./uploads/");
      // cb(null, uploadPath1)
    },
    filename: (req, file, cb) => {
      // Extract studentId from the request body
      const studentId = req.body.studentId;
      // Generate the filename using studentId and original file extension
      const filename = `${studentId}.${file.originalname.split(".").pop()}`;
      cb(null, filename);
    },
  });
  
  const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(__dirname);
      // console.log("myPath",myPath)
      // console.log("myPath",path1)
      // const uploadPath = path.join(__dirname, "../../frontend/");
      // const uploadPath1 = path.join(path1, "/frontend/src/assets/images/StudentImages/");
      // console.log("UploadPath 1" , uploadPath1)
      const imagePath = path.join(__dirname, "../uploads/", "3.jpg");
      console.log(imagePath);
      cb(null, "./uploads/");
      // cb(null, uploadPath1)
    },
    filename: (req, file, cb) => {
      // Extract studentId from the request body
      const { Id } = req.params;
      // console.log(req.params.Id)
  
    //   const fileExtensions = ["jpeg", "jpg", "png", "webp", "avif"];
  
     
  
    //   const uploadsFolderPath = path.join(__dirname, "../uploads");
  
      
  
    //   fileExtensions.map((ext) => {
    //     const imagePath = path.join(__dirname, "../uploads/", `${Id}.${ext}`);
    //     // console.log(imagePath);
  
    //     if (fs.existsSync(imagePath)) {
    //       // Delete the file
    //       fs.unlink(imagePath, (error) => {
    //         if (error) {
    //           console.log("Error deleting image:");
    //           // return res.status(500).json({ error: "Failed to delete image" });
    //         }
    //         // If deletion is successful, send a success response
    //         // res.status(200).json({ message: "Image deleted successfully" });
    //       });
    //     }
    //   });
  
      
  
      // Generate the filename using studentId and original file extension
      const filename = `${Id}.${file.originalname.split(".").pop()}`;
      cb(null, filename);
    },
  });
  // Multer upload middleware
  const upload = multer({ storage });
  const upload1 = multer({ storage: storage1 });

  module.exports = {
    upload,
    upload1
  }