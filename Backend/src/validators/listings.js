const { check } = require("express-validator");
const validateCreateListing = [
  check("title", "title is required").not().isEmpty(),
  check("title", "title must be less than 50 characters").isLength({
    max: 50,
  }),
  check("description", "description is required").not().isEmpty(),
  check("description", "description must be less than 100 characters").isLength(
    {
      max: 100,
    }
  ),
  check("type", "type is required").not().isEmpty(),
  check("type", "type should be either 'free' or 'loan'").isIn([
    "free",
    "loan",
  ]),
  check("image_url", "image_url should be a string").isString(),
];

module.exports = { validateCreateListing };
