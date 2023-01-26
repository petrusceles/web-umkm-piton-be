const cloudinary = require("./config/cloudinaryConfig");

const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
};

module.exports = { uploadToCloudinary };
