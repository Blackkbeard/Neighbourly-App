const mongoose = require("mongoose");
// const { Schema } = mongoose;
const ListingSchema = new mongoose.Schema(
  {
    listing_id: { type: String, required: true, minLength: 1, maxLength: 50 },
    created_at: { type: Date, default: Date.now },
    title: { type: String, required: true, minLength: 1, maxLength: 100 },
    description: { type: String, required: true },
    type: { type: String, required: true, enums: ["free", "loan"] },
    // owner_id: [{ type: Schema.Types.ObjectId, ref: "User" }], add later after User document is set up
    date_available_from: { type: Date, default: Date.now },
    date_available_to: { type: Date },
    image_url: { type: String },
  },
  { collection: "listings" }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
