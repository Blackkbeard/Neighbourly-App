const express = require("express");
const router = express.Router();

const {
  seedAuth,
  register,
  getAccountById,
  getAllAccount,
  login,
  refresh,
  updateProfile,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateUpdateProfile,
} = require("../validators/auth");

const checkValid = require("../middleware/checkValid");

router.get("/seed", seedAuth);
router.get("/accounts", getAllAccount);
router.get("/accounts/:id", getAccountById);
router.put("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshToken, checkValid, refresh);
router.patch("/update/:id", validateUpdateProfile, updateProfile);

module.exports = router;
