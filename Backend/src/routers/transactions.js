const express = require("express");
const {
  seedTransactions,
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByOwnerId,
} = require("../controllers/transactions");
const {
  validateCreateTransaction,
  validateUpdateTransaction,
  validateGetByOwnerId,
  validateIdInParam,
} = require("../validators/transactions");
const checkValid = require("../middleware/checkValid");
const router = express.Router();

router.get("/transactions/seed", seedTransactions);
router.get("/transactions", getAllTransactions);
router.get(
  "/transactions/:id",
  validateIdInParam,
  checkValid,
  getTransactionById
);
router.post(
  "/transactions",
  validateGetByOwnerId,
  checkValid,
  getTransactionsByOwnerId
);
router.put(
  "/transactions",
  validateCreateTransaction,
  checkValid,
  createTransaction
);
router.patch(
  "/transactions/:id",
  validateIdInParam,
  validateUpdateTransaction,
  checkValid,
  updateTransaction
);
router.delete("/transactions/:id", validateIdInParam, deleteTransaction);
module.exports = router;
