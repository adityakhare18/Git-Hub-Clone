const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const s3 = new AWS.S3();
const S3_BUCKET = "githubclone";

module.exports = { s3, S3_BUCKET };
