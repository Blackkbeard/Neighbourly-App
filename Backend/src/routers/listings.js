const express = require("express");
const { seedListings, getAllListings } = require("../controllers/listings");
const router = express.Router();

router.get("/listings/seed", seedListings);
router.get("/listings/", getAllListings);

module.exports = router;
