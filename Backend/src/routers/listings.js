const express = require("express");
const {
  seedListings,
  getAllListings,
  getAllListingsByDistrict,
  getAllListingsByUserId,
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
const { auth } = require("../middleware/auth");

router.get("/listings/seed", seedListings);
router.get("/listings", getAllListings);
router.post("/listings/district", getAllListingsByDistrict);
router.post("/listings/userId", getAllListingsByUserId);
router.get("/listings/:id", validateIdInParam, checkValid, getListingById);
router.put("/listings", auth, validateCreateListing, checkValid, createListing);
router.patch(
  "/listings/:id",
  auth,
  validateIdInParam,
  validatePatchListing,
  checkValid,
  patchListing
);
router.delete("/listings/:id", validateIdInParam, checkValid, deleteListing);

module.exports = router;
