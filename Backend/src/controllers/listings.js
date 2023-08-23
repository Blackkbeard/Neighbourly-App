const { v4: uuidv4 } = require("uuid");

const ListingModel = require('../models/Listings2')

// Seed 2 listings for test user
const seedListings = async (req, res) => {
  try {
    await ListingModel.deleteMany();

    await ListingModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        title: "My beloved bike",
        description: `I’m too busy with my coding bootcamp to ride it. Feel free to borrow it on weekends`,
        type: "loan",
        owner_id: "64e2c2fcdce21246ef81b8ed",
        date_available_from: "2023-07-29",
        date_available_to: "2023-09-30",
        image_url:
          "https://images.immediate.co.uk/production/volatile/sites/21/2021/03/20210317_SB_5DSR_MG_4042-4cbecec.jpg?quality=90&resize=768%2C574",
        created_at: "2023-07-29",
      },
      {
        _id: "64d0f3f75676c304033d8c90",
        title: "Onions",
        description: `Onions are a rich source of fiber and prebiotics, which are necessary for optimal gut health. I bought way too many onions. Giving away for free`,
        type: "free",
        owner_id: "64e2c2fcdce21246ef81b8ee",
        date_available_from: new Date(),
        date_available_to: "2023-09-30",
        image_url:
          "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/onions.jpg?itok=NqLGNDHS",
      },
      {
        _id: "64e309be042d3dfff95cdd1c",
        title: "3D printer",
        description:
          "3D printer collecting dust, please help me to use it! Bring your own files",
        type: "loan",
        owner_id: "64e2c2fcdce21246ef81b8ed",
        date_available_from: "2023-08-18",
        date_available_to: "2022-09-30",
        image_url:
          "https://www.cnet.com/a/img/resize/2aca23cc045a449acf6e22d7a14dd96746aa52b3/hub/2022/04/14/d29a64b0-3bd8-4ce5-8d0b-94baf53cc5dc/3d-printer-promo-blue.jpg?auto=webp&fit=crop&height=1200&width=1200",
      },
    ]);
    res.json({ status: "ok", msg: "Seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Seeding error" });
  }
};

// Get all listings
const getAllListings = async (req, res) => {
  try {
    const allListings = await ListingModel.find().populate("owner_id");
    res.json(allListings);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Error getting listings" });
  }
};

// Get all listings by district
const getAllListingsByDistrict = async (req, res) => {
  try {
    const allListings = await ListingModel.find().populate({
      path: "owner_id",
      match: {
        "location.district": req.body.location,
      },
    });

    const filtered = allListings.filter((item) => item.owner_id != null);

    res.json(filtered);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Error getting listings" });
  }
};

// Get all listings by userId
const getAllListingsByUserId = async (req, res) => {
  try {
    const allListings = await ListingModel.find({
      owner_id: req.body.owner_id,
    }).populate("owner_id");

    res.json(allListings);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Error getting listings" });
  }
};

// Get listing by _id
const getListingById = async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id).populate(
      "owner_id"
    );

    if (!listing) {
      return res
        .status(400)
        .json({ status: "error", error: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot get listing" });
  }
};

// Create new listing
const createListing = async (req, res) => {
  try {
    const createdListing = new ListingModel({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      owner_id: req.body.owner_id,
      date_available_from: req.body.date_available_from,
      // date_available_to: req.body.date_available_to,
      // image_url: req.body.image_url,
    });
    if ("date_available_to" in req.body)
      createdListing.date_available_to = req.body.date_available_to;
    if ("image_url" in req.body) createdListing.image_url = req.body.image_url;

    await createdListing.save();
    res.json({
      status: "ok",
      msg: "Listing saved",
      id: createdListing._id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot create listing" });
  }
};

//update a particular listing by _id
const patchListing = async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);
    if (!listing) {
      return res
        .status(400)
        .json({ status: "error", error: "Listing not found" });
    }

    const updatedListing = {};
    if ("title" in req.body) updatedListing.title = req.body.title;
    if ("description" in req.body)
      updatedListing.description = req.body.description;
    if ("type" in req.body) updatedListing.type = req.body.type;
    if ("owner_id" in req.body) updatedListing.owner_id = req.body.owner_id;
    if ("date_available_from" in req.body)
      updatedListing.date_available_from = req.body.date_available_from;
    if ("date_available_to" in req.body)
      updatedListing.date_available_to = req.body.date_available_to;
    if ("image_url" in req.body) updatedListing.image_url = req.body.image_url;

    await ListingModel.findByIdAndUpdate(req.params.id, updatedListing);

    res.json({ status: "ok", message: "Listing updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", message: "Cannot update listing" });
  }
};

//delete a particular listing by id
const deleteListing = async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id);
    // console.log(listing);
    if (!listing) {
      return res
        .status(400)
        .json({ status: "error", error: "Listing not found" });
    }

    await ListingModel.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", message: "Listing deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Cannot delete listing" });
  }
};

module.exports = {
  seedListings,
  getAllListings,
  getAllListingsByDistrict,
  getAllListingsByUserId,
  getListingById,
  createListing,
  patchListing,
  deleteListing,
};
