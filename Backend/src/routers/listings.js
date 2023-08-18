const express = require("express");
const {
  seedListings,
  getAllListings,
  getListingbyId,
  createListing,
  patchListing,
  deleteListing,
} = require("../controllers/listings");
const router = express.Router();

router.get("/listings/seed", seedListings);
router.get("/listings/", getAllListings);
router.get("/listings/:listing_id", getListingbyId);
router.put("/listings", createListing);
router.patch("/listings/:listing_id", patchListing);
router.delete("/listings/:listing_id", deleteListing);

module.exports = router;
