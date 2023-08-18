const express = require("express");
const {
  seedTransactions,
  getAllTransactions,
  getTransactionsByOwnerId,
} = require("../controllers/transactions");
const checkValid = require("../middleware/checkValid");
const router = express.Router();

router.get("/transactions/seed", seedTransactions);
router.get("/transactions", getAllTransactions);
router.get("/transactions/:id", getTransactionsByOwnerId);

module.exports = router;
