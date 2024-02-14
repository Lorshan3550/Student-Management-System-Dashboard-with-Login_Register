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


const varifyUser = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if(!accesstoken) {
      if(renewToken(req, res)) {
          next()
      }
  } else {
      jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err ,decoded) => {
          if(err) {
              return res.json({valid: false, message: "Invalid Token"})
              
          } else {
              req.role = decoded.role
              next()
          }
      })
  }
}

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  if(!refreshtoken) {
      return res.json({valid: false, message: "No Refresh token"})
  } else {
      jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
          if(err) {
              return res.json({valid: false, message: "Invalid Refresh Token"})
          } else {
              const accessToken = jwt.sign({email: decoded.email}, 
                  "jwt-access-token-secret-key", {expiresIn: '1m'})
              res.cookie('accessToken', accessToken, {maxAge: 60000})
              exist = true;
          }
      })
  }
  return exist;
}


module.exports = { requireAuth , varifyUser };
