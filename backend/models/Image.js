const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBase64: String
});

const Image = mongoose.model('Images', imageSchema);

module.exports = Image;
