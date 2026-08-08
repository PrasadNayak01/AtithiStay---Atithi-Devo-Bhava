const User = require("../models/user.js");

const signupFormController = (req, res) => {
  res.render("users/signup.ejs");
};

const signupUserController = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    await User.register(newUser, password);
    req.login(newUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Account Created Successfully");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

const loginFormController = (req, res) => {
  res.render("users/login.ejs");
};

const loginController = (req, res) => {
  req.flash("success", "Welcome to AtithiStay - Atithi Devo Bhava");
  redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

const logoutController = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out.");
    res.redirect("/listings");
  });
};

module.exports = {
  signupFormController,
  signupUserController,
  loginFormController,
  loginController,
  logoutController,
};
