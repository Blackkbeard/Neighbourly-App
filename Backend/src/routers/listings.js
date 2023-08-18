const express = require("express");
const { seedListings } = require("../controllers/listings");
const router = express.Router();

router.get("/listings/seed", seedListings);

module.exports = router;
