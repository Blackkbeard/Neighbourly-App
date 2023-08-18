const express = require("express");
const router = express.Router();

const {
  seedAuth,
  register,
  getAllAccount,
  login,
  refresh,
} = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");

const checkValid = require("../middleware/checkValid");
// const { auth } = require("../middleware/auth");

router.get("/seed", seedAuth);
router.get("/accounts", getAllAccount);
router.put("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshToken, checkValid, refresh);

module.exports = router;
