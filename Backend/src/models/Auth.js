const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
      enum: ["Yishun", "Queenstown", "Outram Park", "Jurong East"],
    },
    postal_code: {
      type: Number,

      required: true,
      minLength: 1,
      maxLength: 6,
    },
    latitude: { type: Number, required: true },

    longitude: { type: Number, required: true }, // Corrected indentation
  },
  { collection: "Location" }
);

const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, minLength: 1, maxLength: 75 },
    hash: { type: String, required: true, minLength: 6, maxLength: 100 },
    display_name: { type: String, required: false, default: "" },

    biography: {
      type: String,
      default: "",
      required: false,
      minLength: 0,
      maxLength: 100,
    },
    mobile_number: { type: Number, required: true, minLength: 1, maxLength: 9 },
    help_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
    location: [LocationSchema],
  },
  { collection: "auth" }
);
module.exports = mongoose.model("Auth", AuthSchema);

// to create location schema
