const express = require("express");
const {
  seedListings,
  getAllListings,
  getListingById,
  createListing,
  patchListing,
  deleteListing,
} = require("../controllers/listings");
const {
  validateCreateListing,
  validatePatchListing,
  validateIdInParam,
} = require("../validators/listings");
const checkValid = require("../middleware/checkValid");
const router = express.Router();

router.get("/listings/seed", seedListings);
router.get("/listings/", getAllListings);
router.get("/listings/:id", validateIdInParam, checkValid, getListingById);
router.put("/listings", validateCreateListing, checkValid, createListing);
router.patch(
  "/listings/:listing_id",
  validateIdInParam,
  validatePatchListing,
  checkValid,
  patchListing
);
router.delete(
  "/listings/:listing_id",
  validateIdInParam,
  checkValid,
  deleteListing
);

module.exports = router;
