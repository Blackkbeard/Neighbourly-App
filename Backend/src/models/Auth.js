const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    hash: { type: String, required: true },
    display_name: { type: String, required: true },
    location: { type: String, default: "", required: true }, //default location is ""?  to hardcode into options
    postal_code: { type: Number, default: "", required: true },
    biography: { type: String, default: "", required: true },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "auth" }
);

module.exports = mongoose.model("Auth", AuthSchema);
