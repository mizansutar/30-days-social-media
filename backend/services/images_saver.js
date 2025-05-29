const mongoose = require("mongoose");
const Image = require("../models/Image");

const Url="http://localhost:5000"
const uploadImage = async (file) => {
  try {
    if (!file) {
      return { error: "No file uploaded" };
    }

    const img = {
      filename: file.originalname,
      contentType: file.mimetype,
      imageBase64: file.buffer.toString('base64')
    };

    const newImage = new Image(img);
    await newImage.save();
    const imageUrl = `${Url}/api/images/${newImage._id}`;
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = { uploadImage };
