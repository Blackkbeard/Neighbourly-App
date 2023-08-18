const { v4: uuidv4 } = require("uuid");
const express = require("express");

const ListingsSchema = require("../models/listings");

const seedListings = async (req, res) => {
  try {
    await ListingsSchema.deleteMany();

    await ListingsSchema.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        listing_id: uuidv4(),
      },
      {
        _id: "64d0f3f75676c304033d8c8a",
        listing_id: uuidv4(),
      },
    ]);
    console.log("seeded");

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

module.exports = { seedListings };
