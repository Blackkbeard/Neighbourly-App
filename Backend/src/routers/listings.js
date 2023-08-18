const express = require("express");
const {
  seedListings,
  getAllListings,
  getListingbyId,
} = require("../controllers/listings");
const router = express.Router();

router.get("/listings/seed", seedListings);
router.get("/listings/", getAllListings);
router.get("/listings/:listing_id", getListingbyId);

module.exports = router;
