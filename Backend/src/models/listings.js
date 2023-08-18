//Test model

const mongoose = require("mongoose");
const ListingsSchema = new mongoose.Schema(
  {
    listing_id: { type: String, required: true, minLength: 1, maxLength: 50 },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "test" }
);

module.exports = mongoose.model("Listings", ListingsSchema);
