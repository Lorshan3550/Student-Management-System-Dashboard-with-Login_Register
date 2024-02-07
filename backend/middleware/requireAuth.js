const jwt = require("jsonwebtoken");
const User = require("../model/user")

async function requireAuth(req, res, next) {
  // console.log("In middleware")
  // next()
  try {
    // Read token off cookies
    const token = req.cookies.Authorization;
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user using decoded sub
    const user = await User.findOne(decoded.sub) // attach user to req
    if (!user) return res.sendStatus(401)

    // attach user to req
    req.user = user
    // continue on
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}

module.exports = { requireAuth };
