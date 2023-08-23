const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now },
    title: { type: String, required: true, minLength: 1, maxLength: 100 },
    description: { type: String, required: true },
    type: { type: String, required: true, enums: ["free", "loan"] },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    date_available_from: { type: Date, default: Date.now, required: true },
    date_available_to: { type: Date },
    image_url: { type: String },
  },
  { collection: "listings" }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
