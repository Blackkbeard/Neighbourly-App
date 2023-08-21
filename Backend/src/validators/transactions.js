const { check, param } = require("express-validator");

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 24, max: 24 }),
];

const validateCreateTransaction = [
  check("owner_id", "owner_id is required").not().isEmpty(),
  param("owner_id", "invalid owner_id").isLength({ min: 24, max: 24 }),
  check("requester_id", "requester_id is required").not().isEmpty(),
  param("requester_id", "invalid requester_id").isLength({ min: 24, max: 24 }),
  check("listing_id", "listing_id is required").not().isEmpty(),
  param("listing_id", "invalid listing_id").isLength({ min: 24, max: 24 }),
];

const validateUpdateTransaction = [
  param("owner_id", "invalid owner_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
  param("requester_id", "invalid requester_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
  param("listing_id", "invalid listing_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
];

module.exports = {
  validateCreateTransaction,
  validateUpdateTransaction,
  validateIdInParam,
};
