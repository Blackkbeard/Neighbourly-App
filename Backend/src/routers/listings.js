const express = require("express");
const {
  seedListings,
  getAllListings,
  getListingById,
  createListing,
  patchListing,
  deleteListing,
} = require("../controllers/listings");
const { validateCreateListing } = require("../validators/listings");
const checkValid = require("../middleware/checkValid");
const router = express.Router();

router.get("/listings/seed", seedListings);
router.get("/listings/", getAllListings);
router.get("/listings/:listing_id", getListingById);
router.put("/listings", validateCreateListing, checkValid, createListing);
router.patch("/listings/:listing_id", patchListing);
router.delete("/listings/:listing_id", deleteListing);

module.exports = router;
