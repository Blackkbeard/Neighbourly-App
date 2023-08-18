const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    hash: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "auth" }
);

module.exports = mongoose.model("Auth", AuthSchema);
