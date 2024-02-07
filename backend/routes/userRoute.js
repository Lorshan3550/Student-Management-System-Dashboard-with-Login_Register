const express = require("express");

const {registerUser, loginUser , logoutUser} = require("../controllers/userController")

const userRouter = express.Router();


userRouter.post("/signup", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout", logoutUser)

module.exports = {userRouter}
