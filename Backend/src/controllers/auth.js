const AuthModel = require("../models/Auth");
const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// To seed Data
const seedAuth = async (req, res) => {
  try {
    await AuthModel.deleteMany();

    await AuthModel.create([
      {
        _id: "64e2c2fcdce21246ef81b8ed",
        email: "desmond@test.com",
        hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
        display_name: "desmond@test.com",
        biography: "I am a test user1",
        help_count: 0,
        rating: 0,
        mobile_number: 12345678,
        location: [
          {
            district: "Yishun",
            postal_code: 760758,
            latitude: 1.42602952702202,
            longitude: 103.834266086838,
          },
        ],
      },
      {
        _id: "64e2c2fcdce21246ef81b8ee",
        email: "hwee@test.com",
        hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
        display_name: "hwee@test.com",
        biography: "I am a test user2",
        help_count: 0,
        rating: 0,
        mobile_number: 12345678,
        location: [
          {
            district: "Yishun",
            postal_code: 760761,
            latitude: 1.4253984246908402,
            longitude: 103.83325903597616,
          },
        ],
      },
      {
        _id: "64e2c2ffdce21246ef81b8f4",
        email: "vinesh@test.com",
        hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
        display_name: "vinesh@test.com",
        biography: "I am a test user3",
        help_count: 0,
        rating: 0,
        mobile_number: 12345678,
        location: [
          {
            district: "Yishun",
            postal_code: 760753,
            latitude: 1.4269870421973032,
            longitude: 103.83462747028466,
          },
        ],
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};
// To get all RegisteredData
const getAllAccount = async (req, res) => {
  try {
    const allAcc = await AuthModel.find();
    res.json(allAcc);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};
// To Register
const register = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ msg: "Duplicate email" });
    }
    const hash = await bcrypt.hash(req.body.password, 5);
    await AuthModel.create({
      email: req.body.email,
      hash,
      display_name: req.body.email,
      location: req.body.location,
      mobile_number: req.body.mobile_number,
      biography: req.body.biography,
      help_count: 0,
      rating: 0,
    });
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });

    if (!auth) {
      return res.status(400).json({
        status: "error",
        msg: "You Do not have an account. Please register",
      });
    }
    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }
    const claims = {
      email: auth.email,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      email: decoded.email,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "token refresh error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const authDB = await AuthModel.findById(req.params.id);

    if ("display_name" in req.body) authDB.display_name = req.body.display_name;
    if ("mobile_number" in req.body)
      authDB.mobile_number = req.body.mobile_number;
    if ("biography" in req.body) authDB.biography = req.body.biography;
    if ("help_count" in req.body) authDB.help_count = req.body.help_count;
    if ("rating" in req.body) authDB.rating = req.body.rating;
    if ("district" in req.body) authDB.location[0].district = req.body.district;
    if ("postal_code" in req.body)
      authDB.location[0].postal_code = req.body.postal_code;

    await authDB.save();

    // const updatedProfile = {};
    // if ("display_name" in req.body)
    //   updatedProfile.display_name = req.body.display_name;
    // if ("mobile_number" in req.body)
    //   updatedProfile.mobile_number = req.body.mobile_number;

    // if ("location" in req.body) updatedProfile.location = req.body.location;
    // if ("postal_code" in req.body)
    //   updatedProfile.location[0].postal_code = req.body.postal_code;
    // if ("biography" in req.body) updatedProfile.biography = req.body.biography;
    // if ("help_count" in req.body)
    //   updatedProfile.help_count = req.body.help_count;
    // if ("rating" in req.body) updatedProfile.rating = req.body.rating;
    // await AuthModel.findByIdAndUpdate(req.params.id, updatedProfile);

    res.json({ status: "ok", msg: "Account updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  seedAuth,
  register,
  getAllAccount,
  login,
  refresh,
  updateProfile,
};
