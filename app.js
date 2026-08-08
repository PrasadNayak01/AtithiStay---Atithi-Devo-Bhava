// Packages
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Files
const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listings.routes.js");
const reviewRouter = require("./routes/reviews.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();

const dbUrl = process.env.MONGO_ATLAS_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  },
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("error.ejs", { status, message, err });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}`);
});
