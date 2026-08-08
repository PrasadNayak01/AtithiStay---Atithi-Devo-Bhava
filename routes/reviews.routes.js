// Packages
const express = require("express");
const router = express.Router({ mergeParams: true });

// Files
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const {
  createReviewController,
  destroyReviewController,
} = require("../controllers/reviews.controllers.js");

// Create Route for Review
router.post("/", isLoggedIn, validateReview, wrapAsync(createReviewController));

// Delete Route for Review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReviewController),
);

module.exports = router;
