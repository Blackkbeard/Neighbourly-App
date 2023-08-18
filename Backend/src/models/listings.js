const mongoose = require("mongoose");
const ListingsSchema = new mongoose.Schema(
  {
    listing_id: { type: String, required: true, minLength: 1, maxLength: 50 },
    created_at: { type: Date, default: Date.now },
    listing_id: { type: String, required: true, minLength: 1, maxLength: 50 },
    title: { type: String, required: true, minLength: 1, maxLength: 100 },
    description: { type: String, required: true },
    type: { type: String, required: true, enums: ["free", "loan"] },
    owner_id: { type: String, required: true, enums: ["free", "loan"] },
    date_available_from: { type: Date, default: Date.now },
    date_available_to: { type: Date },
    image_url: { type: String, enums: ["free", "loan"] },
  },
  { collection: "listings" }
);

module.exports = mongoose.model("Listings", ListingsSchema);
