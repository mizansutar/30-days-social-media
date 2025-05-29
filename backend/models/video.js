const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  videoBase64: String
});

const Video = mongoose.model('Videos', videoSchema);

module.exports = Video;
