// Packages
const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const { storage } = require("../cloudinaryConfig.js");
const upload = multer({ storage });

// Files
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const {
  indexListingController,
  newListingController,
  createListingController,
  showListingController,
  editListingController,
  updateListingController,
  destroyListingController,
} = require("../controllers/listings.controllers.js");

// Index and Create Route for Listings
router
  .route("/")
  .get(wrapAsync(indexListingController))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListingController),
  );

// New Route for Listings
router.get("/new", isLoggedIn, newListingController);

// Show, Update and Delete Route for Listings
router
  .route("/:id")
  .get(wrapAsync(showListingController))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListingController),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListingController));

// Edit Route for Listings
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListingController));

module.exports = router;
