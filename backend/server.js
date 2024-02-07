// Load env variables
const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Import dependencies
const express = require("express");
const { app } = require("./routes/index");

const port = process.env.PORT;



// Start our server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
