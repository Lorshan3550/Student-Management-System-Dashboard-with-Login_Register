const express = require("express");

const {registerUser, loginUser , logoutUser, navigateHome , getUserRole} = require("../controllers/userController")
const {varifyUser} = require("../middleware/requireAuth")

const userRouter = express.Router();


userRouter.post("/signup", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout", logoutUser)
userRouter.get("/home" ,navigateHome )
userRouter.post("/role", getUserRole)

module.exports = {userRouter}
