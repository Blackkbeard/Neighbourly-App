const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),

  body("password", "password is invalid")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 50 }),
  // body("lcoation", "location error").isArray(),
  body("location.*.district", "district is required").not().isEmpty(),
  body("location.*.postal_code", "postal code is required")
    .not()
    .isEmpty()
    .isLength(6),
];

const validateLoginData = [
  body("email", "email is invalid").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is invalid")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];
const validateUpdateProfile = [
  body("display_name", "display name is required").not().isEmpty(),
  body("mobile_number", "mobile number is required")
    .not()
    .isEmpty()
    .isLength(8),
  body("biography", "biography is required").not().isEmpty(),
];
module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateUpdateProfile,
};
