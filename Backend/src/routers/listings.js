const express = require("express");
const {
  seedListings,
  getAllListings,
  getListingbyId,
  createListing,
} = require("../controllers/listings");
const router = express.Router();

router.get("/listings/seed", seedListings);
router.get("/listings/", getAllListings);
router.get("/listings/:listing_id", getListingbyId);
router.put("/listings", createListing);

module.exports = router;
