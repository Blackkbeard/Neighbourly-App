const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    requester_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enums: [
        "pending_owner_response",
        "accepted",
        "declined",
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
