const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const { studentRouter } = require("./studentRoute");
const { userRouter } = require("./userRoute");
const connectToDb = require("../config/connectToDb");
const User = require("../model/user");

const app = express();

const clientid = "522219305728-eud9i89lsf72mqgv500rhs2fpdjbvhr5.apps.googleusercontent.com"
const clientsecret = "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"

// Set up cors
// app.use(cors())
// app.use(cors({
//   origin: true,
//   credentials: true
// }))

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

// Cookies
app.use(cookieParser());

// setup session
app.use(
  session({
    secret: "eyfy3fy3bfy4151fnuhf8u3fu*",
    resave: false,
    saveUninitialized: true,
  })
);

// Other setup like middleware, database connection

// Connect to the database
connectToDb();

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            userName: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google ouath login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout-okay", (req, res) => {
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect("http://localhost:5173/login");
  // });
  req.logout()
  res.redirect("http://localhost:5173/login")
});

// Configure different routes
app.use("/", studentRouter);
app.use("/", userRouter);

// Testing Route
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

module.exports = { app };
