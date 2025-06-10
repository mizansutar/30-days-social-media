const Post_images = require("../models/Post_images");
const User = require('../models/user_model.js');


const { uploadImage } = require("../services/images_saver");


const CreatePost_Image = async (req, res) => {
  try {
    const { description, privacy } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!description || !privacy) {
      return res.status(400).json({ message: "Description and privacy are required" });
    }

    const authorId = req.user.id; // Assuming user ID is available in req.user
    const mediaUrl = await uploadImage(file);

    const newPost = new Post_images({
      description,
      privacy,
      mediaUrl,
      author: authorId
    });

    await newPost.save();

    // Add the new post ID to the user's posts array
    await User.findByIdAndUpdate(
      authorId,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    res.status(201).json({ message: "Post created successfully", post: newPost, success: true });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const get_all_image_post = async (req, res) => {
  try {
    const authorId = req.user.id;
    const allImagesPost = await Post_images.find({ author: authorId });
    res.status(200).json({ msg: "all data", posts: allImagesPost, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch text posts' });
  }
};


module.exports = { CreatePost_Image, get_all_image_post, };