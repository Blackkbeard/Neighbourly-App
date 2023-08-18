const { v4: uuidv4 } = require("uuid");
const express = require("express");

const ListingModel = require("../models/listings");

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

module.exports = { seedListings };
