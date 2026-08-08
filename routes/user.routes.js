// Packages
const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");

// Files
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const {
  signupFormController,
  signupUserController,
  loginFormController,
  loginController,
  logoutController,
} = require("../controllers/users.controllers.js");

// Signup
router
  .route("/signup")
  .get(signupFormController)
  .post(wrapAsync(signupUserController));

// Login
router
  .route("/login")
  .get(loginFormController)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    loginController,
  );

// Logout
router.get("/logout", logoutController);

module.exports = router;
