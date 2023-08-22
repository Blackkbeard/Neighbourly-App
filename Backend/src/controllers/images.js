const dotenv = require("dotenv");

dotenv.config(); //to bring in env variables for s3 client
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); //AWS s3 client
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const sharp = require("sharp"); //for image resizing
const AuthModel = require("../models/Auth");

//set up new s3 object
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

//upload new image
const uploadImage = async (req, res) => {
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
    console.log("Image uploaded successfully");
    res.send({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading and updating user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// get all images
const getImages = async (req, res) => {};

// delete image
const deleteImage = async (req, res) => {};

module.exports = { getImages, uploadImage, deleteImage };
