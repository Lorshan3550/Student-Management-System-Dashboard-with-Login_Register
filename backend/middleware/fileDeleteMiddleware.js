const path = require("path");
const fs = require("fs");

const deleteImage = async (req, res, next) => {
  const fileExtensions = ["jpeg", "jpg", "png", "webp", "avif"];

  try {
    const { Id } = req.params;
    

    // if(!req.role){
    //   next()
    // }
    const promises = fileExtensions.map((ext) => {
      const imagePath = path.join(__dirname, "../uploads/", `${Id}.${ext}`);
      // Check if the file exists
      if (fs.existsSync(imagePath)) {
        // Delete the file
        return new Promise((resolve, reject) => {
          fs.unlink(imagePath, (error) => {
            if (error) {
              console.log("Error deleting image:", error);
              reject(error);
            }
            resolve();
          });
        });
      }
    });
    // Wait for all file deletion promises to resolve
    await Promise.all(promises);
    // Call next() only once after all file deletion operations are completed
    next();
  } catch (error) {
    console.log(error);
    next(); // Pass error to the error handling middleware
  }
};

module.exports = { deleteImage };
