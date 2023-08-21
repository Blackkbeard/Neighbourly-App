const { v4: uuidv4 } = require("uuid");

const TransactionModel = require("../models/Transactions");

//Seed 2 transactions for test user.
const seedTransactions = async (req, res) => {
  try {
    await TransactionModel.deleteMany();

    await TransactionModel.create([
      {
        _id: "64e2c98f2097aba61989d93c",
        listing_id: "64d0f3f75676c304033d8c89",
        owner_id: "64e2c2fcdce21246ef81b8ed",
        requester_id: "64e2c2ffdce21246ef81b8f4",
        type: "pending_response",
      },
      {
        _id: "64e2c98f2097aba61989d93d",
        listing_id: "64d0f3f75676c304033d8c89",
        owner_id: "64e2c2fcdce21246ef81b8ed",
        requester_id: "64e2c2ffdce21246ef81b8f4",
        type: "pending_response",
      },
      {
        _id: "64e2c98f2097aba61989d93e",
        listing_id: "64d0f3f75676c304033d8c89",
        owner_id: "64e2c2fcdce21246ef81b8ed",
        requester_id: "64e2c2fcdce21246ef81b8ee",
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
    const transactions = await TransactionModel.find({
      owner_id: req.params.owner_id,
    });

    if (transactions.length === 0) {
      return res
        .status(400)
        .json({ status: "error", error: "Transactions not found" });
    }
    res.json(transactions);
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", message: "Cannot get transaction" });
  }
};

// Get transactions by requester's's id
// TODO: debug
const getTransactionsByRequesterId = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({
      requester_id: req.params.requester_id,
    });

    if (transactions.length === 0) {
      return res
        .status(400)
        .json({ status: "error", error: "Transactions not found" });
    }
    res.json(transactions);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot get listings" });
  }
};

//Create new transaction
const createTransaction = async (req, res) => {
  try {
    const createdTransaction = new TransactionModel({
      owner_id: req.body.owner_id,
      requester_id: req.body.requester_id,
      listing_id: req.body.listing_id,
    });
    await createdTransaction.save();
    res.json({
      status: "ok",
      msg: "Transaction saved",
      createdTransaction,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", message: "Cannot create transaction" });
  }
};

//Update transaction
//Delete transaction

module.exports = {
  seedTransactions,
  getAllTransactions,
  getTransactionsByOwnerId,
  getTransactionsByRequesterId,
  createTransaction,
};
