const { v4: uuidv4 } = require("uuid");

const TransactionModel = require("../models/Transactions");

//Seed 2 transactions for test user.

const seedTransactions = async (req, res) => {
  try {
    await TransactionModel.deleteMany();

    await TransactionModel.create([
      {
        listing_id: "64d0f3f75676c304033d8c90",
        owner_id: "64df45f6d43f6b36609ea557",
        requester_id: "requester1",
        type: "pending_response",
      },
      {
        listing_id: "64d0f3f75676c304033d8c89",
        owner_id: "64df45f6d43f6b36609ea557",
        requester_id: "requester1",
        type: "pending_response",
      },
      {
        listing_id: "64d0f3f75676c304033d8c89",
        owner_id: "64df45f6d43f6b36609ea558",
        requester_id: "requester1",
        type: "accepted",
      },
    ]);
    res.json({ status: "ok", msg: "Seeding transactions successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await TransactionModel.find();
    res.json(allTransactions);
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error getting transactions" });
  }
};

// Get transactions by owner's id
const getTransactionsByOwnerId = async (req, res) => {
  try {
    const listings = await TransactionModel.find({ owner_id: req.params.id });

    if (listings.length === 0) {
      return res
        .status(400)
        .json({ status: "error", error: "Transactions not found" });
    }
    res.json(listings);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot get listings" });
  }
};

module.exports = {
  seedTransactions,
  getAllTransactions,
  getTransactionsByOwnerId,
};
