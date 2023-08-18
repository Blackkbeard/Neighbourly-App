const express = require("express");
const { seedTransactions } = require("../controllers/transactions");
const checkValid = require("../middleware/checkValid");
const router = express.Router();

router.get("/transactions/seed", seedTransactions);

module.exports = router;
