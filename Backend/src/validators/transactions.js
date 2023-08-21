const { check, param } = require("express-validator");

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 24, max: 24 }),
];

const validateCreateTransaction = [
  check("owner_id", "owner_id is required").not().isEmpty(),
  check("owner_id", "invalid owner_id").isLength({ min: 24, max: 24 }),
  check("requester_id", "requester_id is required").not().isEmpty(),
  check("requester_id", "invalid requester_id").isLength({ min: 24, max: 24 }),
  check("listing_id", "listing_id is required").not().isEmpty(),
  check("listing_id", "invalid listing_id").isLength({ min: 24, max: 24 }),
  check(
    "status",
    `type should be either "pending_owner_response", "accepted", "declined", "completed", or "expired"`
  )
    .optional()
    .isIn([
      "pending_owner_response",
      "accepted",
      "declined",
      "completed",
      "expired",
    ]),
];

const validateGetByUserId = [
  check("owner_id", "invalid owner_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
  check("requester_id", "invalid requester_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
];

const validateUpdateTransaction = [
  check("owner_id", "invalid owner_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
  check("requester_id", "invalid requester_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
  check("listing_id", "invalid listing_id")
    .optional()
    .isLength({ min: 24, max: 24 }),
  check(
    "status",
    `type should be either "pending_owner_response", "accepted", "declined", "completed", or "expired"`
  )
    .optional()
    .isIn([
      "pending_owner_response",
      "accepted",
      "declined",
      "completed",
      "expired",
    ]),
];

module.exports = {
  validateCreateTransaction,
  validateUpdateTransaction,
  validateGetByUserId,
  validateIdInParam,
};
