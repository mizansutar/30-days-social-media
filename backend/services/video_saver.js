const mongoose = require("mongoose");
const video = require("../models/video");

const Url="http://localhost:5000"
const uploadVideo = async (file) => {
  try {
    if (!file) {
      return { error: "No file uploaded" };
    }

    const vid = {
      filename: file.originalname,
      contentType: file.mimetype,
      videoBase64: file.buffer.toString('base64')
    };

    const newVideo = new video(vid);
    await newVideo.save();
    const videoUrl = `${Url}/api/videos/${newVideo._id}`;
    console.log(videoUrl);
    return videoUrl;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = { uploadVideo };
