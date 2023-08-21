const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    area: {
      location: {
        type: String,
        required: true,
        enum: ["Yishun", "Queenstown", "Outram Park", "Jurong East"],
        default: "",
      },
      postal_code: {
        type: Number,
        default: "",
        required: true,
        minLength: 1,
        maxLength: 6,
      },

      longitude: { type: Number, required: true, default: 0 }, // Corrected indentation
      latitude: { type: Number, required: true, default: 0 },
    },
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
    mobile_number: { type: Number, required: true, minLength: 8, maxLength: 8 },
    help_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
    location: [LocationSchema],
  },
  { collection: "auth" }
);
module.exports = mongoose.model("Auth", AuthSchema);

// to create location schema
module.exports = mongoose.model("Location", LocationSchema);
