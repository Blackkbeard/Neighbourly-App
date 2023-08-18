const express = require("express");
const router = express.Router();

const { register, login, refresh } = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");

const checkValid = require("../middlware/checkValid");

router.put("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshToken, checkValid, refresh);

module.exports = router;
