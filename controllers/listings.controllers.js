// Files
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

const indexListingController = async (req, res, next) => {
  let listings = await Listing.find();
  res.render("listings/index.ejs", { listings });
};

const newListingController = (req, res) => {
  res.render("listings/new.ejs");
};

const createListingController = async (req, res, next) => {
  const { path, filename } = req.file;

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url: path, filename };

  const location = req.body.listing.location;
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${process.env.MAPTILER_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  newListing.geometry = data.features[0].geometry;

  await newListing.save();
  req.flash("success", "Listing Created Successfully");
  res.redirect("/listings");
};

const showListingController = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing doesn't exist...");
    res.redirect("/listings");
    return;
  }
  res.render("listings/show.ejs", { listing });
};

const editListingController = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing doesn't exist...");
    res.redirect("/listings");
    return;
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250,e_blur:40",
  );
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

const updateListingController = async (req, res, next) => {
  let { id } = req.params;
  if (!req.body?.listing) {
    return next(new ExpressError(400, "Send Valid Data"));
  }
  let listing = req.body.listing;
  if (req.file) {
    let { path, filename } = req.file;
    listing.image = { url: path, filename };
  }

  const location = req.body.listing.location;
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${process.env.MAPTILER_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  listing.geometry = data.features[0].geometry;

  await Listing.findByIdAndUpdate(id, listing, {
    runValidators: true,
    returnDocument: "after",
  });
  req.flash("success", "Updated Successfully");
  res.redirect(`/listings/${id}`);
};

const destroyListingController = async (req, res, next) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};

module.exports = {
  indexListingController,
  newListingController,
  createListingController,
  showListingController,
  editListingController,
  updateListingController,
  destroyListingController,
};
