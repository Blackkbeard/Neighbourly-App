const { v4: uuidv4 } = require("uuid");
const express = require("express");

const ListingModel = require("../models/listings");

// Seed 2 listings for test user. Update to vinesh's seeded user
const seedListings = async (req, res) => {
  try {
    await ListingModel.deleteMany();

    await ListingModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        listing_id: uuidv4(),
        title: "My beloved bike",
        description: `I’m too busy with my coding bootcamp to ride it. Feel free to borrow it on weekends`,
        type: "loan",
        owner_id: "Owner1",
        date_available_from: `${new Date()}`,
        date_available_to: "2022-09-30",
        image_url:
          "https://images.immediate.co.uk/production/volatile/sites/21/2021/03/20210317_SB_5DSR_MG_4042-4cbecec.jpg?quality=90&resize=768%2C574",
      },
      {
        _id: "64d0f3f75676c304033d8c90",
        listing_id: uuidv4(),
        title: "Onions",
        description: `Onions are a rich source of fiber and prebiotics, which are necessary for optimal gut health. I bought way too many onions. Giving away for free`,
        type: "free",
        owner_id: "Owner1",
        date_available_from: `${new Date()}`,
        date_available_to: "2022-08-30",
        image_url:
          "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/onions.jpg?itok=NqLGNDHS",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

// Get all listings
const getAllListings = async (req, res) => {
  try {
    const allListings = await ListingModel.find();
    res.json(allListings);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "error getting listings" });
  }
};

// Get listing by listing_id
const getListingbyId = async (req, res) => {
  try {
    const listing = await ListingModel.find({
      listing_id: req.params.listing_id,
    });
    res.json(listing);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "cannot get listing" });
  }
};

// Create new listing
const createListing = async (req, res) => {
  try {
    const createdListing = new ListingModel({
      listing_id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      owner_id: req.body.owner_id,
      date_available_from: req.body.date_available_from,
      date_available_to: req.body.date_available_to,
      image_url: req.body.image_url,
    });
    await createdListing.save();
    res.json({ status: "ok", msg: "listing saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "cannot create listing" });
  }
};

module.exports = {
  seedListings,
  getAllListings,
  getListingbyId,
  createListing,
};
