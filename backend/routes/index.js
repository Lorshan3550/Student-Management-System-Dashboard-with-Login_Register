const express = require("express");
const cors = require("cors")

const {studentRouter} = require("./studentRoute")
const {userRouter} = require("./userRoute")
const connectToDb = require("../config/connectToDb");

const app = express();

// Set up cors
app.use(cors())

// Cookies
// app.use(cookieParser())

// Other setup like middleware, database connection

// Connect to the database
connectToDb();

app.use(express.json());

// Configure different routes
app.use("/", studentRouter);
app.use("/", userRouter);

// Testing Route
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

module.exports = { app };
