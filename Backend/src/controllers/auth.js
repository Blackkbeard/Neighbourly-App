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
        hash: "testing1234",
        location: "Yishun",
        postal_code: 123456,
        biography: "I am a test user1",
        help_count: 0,
        rating: 0,
      },
      {
        email: "test2@test.com",
        hash: "testing1234",
        location: "Outram Park",
        postal_code: 123456,
        biography: "I am a test user2",
        help_count: 0,
        rating: 0,
      },
      {
        email: "test3@test.com",
        hash: "testing12345",
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

// const updateProfile = (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "error", msg: "update profile error" });
//   }
// };
module.exports = { seedAuth, register, getAllAccount, login, refresh };
