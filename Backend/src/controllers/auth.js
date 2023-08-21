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
        email: "test1@test.com",
        hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
        location: "Yishun",
        postal_code: 123456,
        biography: "I am a test user1",
        help_count: 0,
        rating: 0,
      },
      {
        email: "test2@test.com",
        hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
        location: "Outram Park",
        postal_code: 123456,
        biography: "I am a test user2",
        help_count: 0,
        rating: 0,
      },
      {
        email: "test3@test.com",
        hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
        location: "Queenstown",
        postal_code: 123456,
        biography: "I am a test user3",
        help_count: 0,
        rating: 0,
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
      postal_code: req.body.postal_code,
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
    const updatedProfile = {};
    if ("display_name" in req.body)
      updatedProfile.display_name = req.body.display_name;
    if ("location" in req.body) updatedProfile.location = req.body.location;
    if ("postal_code" in req.body)
      updatedProfile.postal_code = req.body.postal_code;
    if ("biography" in req.body) updatedProfile.biography = req.body.biography;
    await AuthModel.findByIdAndUpdate(req.params.id, updatedProfile);
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
