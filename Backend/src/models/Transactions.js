const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now },
    owner_id: { type: String, required: true }, //user's _id
    requester_id: { type: String, required: true }, //user's _id
    listing_id: { type: String, required: true }, //listing's _id
    status: {
      type: String,
      required: true,
      enums: [
        "pending_owner_response",
        "owner_accepted",
        "owner_declined",
        "completed",
        "expired",
      ],
      default: "pending_owner_response",
    },
  },
  { collection: "transactions" }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
