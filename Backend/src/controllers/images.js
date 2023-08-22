const dotenv = require("dotenv");

dotenv.config(); //to bring in env variables for s3 client
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); //AWS s3 client
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

//set up new s3 object
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// get all images
const getImages = async (req, res) => {};

//upload new image
const uploadImage = async (req, res) => {
  console.log("req.body", req.body);

  //send req.file.buffer to s3
  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);

  res.send({});
};

// delete image
const deleteImage = async (req, res) => {};

module.exports = { getImages, uploadImage, deleteImage };
