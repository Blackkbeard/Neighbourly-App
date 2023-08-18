const express = require("express");
const {
  seedTransactions,
  getAllTransactions,
} = require("../controllers/transactions");
const checkValid = require("../middleware/checkValid");
const router = express.Router();

router.get("/transactions/seed", seedTransactions);
router.get("/transactions", getAllTransactions);
module.exports = router;
