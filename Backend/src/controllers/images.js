const dotenv = require("dotenv");

dotenv.config(); //to bring in env variables for s3 client
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); //AWS s3 client
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const sharp = require("sharp"); //for image resizing
const AuthModel = require("../models/Auth");
const ListingModel = require("../models/Listings2");

//set up new s3 object
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

//upload new avatar to s3 and update user image URL in mongodb
const uploadAvatar = async (req, res) => {
  try {
    const user_id = req.body.user_id;

    //resize image
    const buffer = await sharp(req.file.buffer)
      .resize(300, 300, {
        fit: "contain",
      })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `image-${Date.now()}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    //store s3 URL in mongodb database:
    //retrieve user and update image_url field with the S3 URL
    const user = await AuthModel.findById(user_id);
    user.image_url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${params.Key}`;
    await user.save();
    console.log("User image uploaded successfully");
    res.send({
      message: "User image uploaded successfully",
      url: user.image_url,
    });
  } catch (error) {
    console.error("Error uploading and updating user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//upload new image to s3 and update listing image URL in mongodb
const uploadListingImage = async (req, res) => {
  try {
    //resize image
    const buffer = await sharp(req.file.buffer)
      .resize(400, 400, {
        fit: "contain",
      })
      .toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `image-${Date.now()}.jpeg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log("Listing image uploaded successfully");

    //store s3 URL in mongodb database:
    //retrieve user and update image_url field with the S3 URL
    const image_url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${params.Key}`;

    if ("listing_id" in req.body) {
      const listing_id = req.body.listing_id;
      const listing = await ListingModel.findById(listing_id);
      listing.image_url = image_url;
      await listing.save();
      console.log("Listing image stored in db");
    }

    res.send({
      message: "Listing image uploaded successfully",
      url: image_url,
    });
  } catch (error) {
    console.error("Error uploading and updating listing:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { uploadAvatar, uploadListingImage };
