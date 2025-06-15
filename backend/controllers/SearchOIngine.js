// controllers/searchController.js

const Post = require("../models/Post_images");
const Video = require("../models/Video_model");
const Poll = require("../models/poll_saving");
const TextStory = require("../models/Text_story");
const User = require("../models/user_model");

exports.searchAll = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const [posts, videos, polls, stories, users] = await Promise.all([
      Post.find({ $text: { $search: query }, privacy: "public" }),
      Video.find({ $text: { $search: query }, privacy: "public" }),
      Poll.find({ $text: { $search: query }, privacy: "public" }),
      TextStory.find({ $text: { $search: query }, privacy: "public" }),
      User.find({ $text: { $search: query } }),
    ]);

    res.json({ posts, videos, polls, stories, users });
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
};
