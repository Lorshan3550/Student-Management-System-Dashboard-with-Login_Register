const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { userName, password, userType } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ userName, password: hashedPassword, userType });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const loginUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { userName, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a jwt token - $ npm install jsonwebtoken
    // openssl rand -hex 32
    // const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days in milliseconds
    // const exp1 = Date.now() + 1000
    // const token = jwt.sign({ sub: user.userName, exp: exp }, process.env.SECRET);

    // // Set the cookie -  $ npm install cookie-parser
    // // https://github.com/jshttp/cookie
    // res.cookie("Authorization", token, {
    //   expires: new Date(exp),
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    // });

    // const token = jwt.sign({ sub: user.userName }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // // Set the cookie
    // res.cookie('Authorization', token, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   secure: process.env.NODE_ENV === 'production',
    // });

    // const accessToken = jwt.sign(
    //   { role: user.userType },
    //   "jwt-access-token-secret-key",
    //   { expiresIn: "1m" }
    // );
    // const refreshToken = jwt.sign(
    //   { role: user.userType },
    //   "jwt-refresh-token-secret-key",
    //   { expiresIn: "5m" }
    // );

    // const oneHour = 1000 * 60 * 60;
    // const oneDay = oneHour * 24;

    // res.cookie("accessToken", accessToken, { maxAge: oneHour });

    // res.cookie("refreshToken", refreshToken, {
    //   maxAge: oneDay,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    // });
    res.status(200).json({ Login: true, Role: user.userType, Name: user.userName.split("@")[0] });

    // res.sendStatus(200);
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({ error: "Failed to log in user" });
  }
};

const getUserRole = async (req, res) => {
  const { userName } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({Role : user.userType})
};
const logoutUser = (req, res) => {
  // You may want to handle token invalidation or expiration on the client side
  res.status(200).json({ message: "Logout successful" });
};

const navigateHome = (req, res) => {
  // You may want to handle token invalidation or expiration on the client side
  res.status(200).json({ message: "came to home page" });
};

module.exports = { registerUser, loginUser, logoutUser, navigateHome , getUserRole };
