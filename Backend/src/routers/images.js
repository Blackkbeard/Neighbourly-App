const express = require("express");
const multer = require("multer"); //middleware to read image data

//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

const { uploadAvatar, uploadListingImage } = require("../controllers/images");
const router = express.Router();

router.post("/images/avatars", upload.single("image"), uploadAvatar);
router.post("/images/listings", upload.single("image"), uploadListingImage);

module.exports = router;
