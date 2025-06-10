const TextStory =require("../models/Text_story");
const User = require("../models/user_model");
const mongoose = require("mongoose");

const createTextStory = async (req, res) => {
    try {
        const { description, privacy } = req.body;
        const authorId = req.user.id;
    
        if (!description) {
        return res.status(400).json({ message: "Description is required" });
        }
    console.log("Author ID:", authorId);
        const newTextStory = new TextStory({
        description,
        privacy,
        author: authorId,
        });
        const savedTextStory = await newTextStory.save();


         await User.findByIdAndUpdate(
              authorId,
              { $push: { posts: savedTextStory._id } },
              { new: true }
            );
        return res.status(201).json({ msg: "Text story created successfully", success: true, data: savedTextStory });
    } catch (error) {
        console.error("Error creating text story:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const get_all_text_post = async (req, res) => {
  try {
    const authorId = req.user.id;
    const allTextPosts = await TextStory.find({ author: authorId });
    res.status(200).json({msg :"all data", storyPosts:allTextPosts,success:true});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch text posts' });
  }
};

module.exports = {
    createTextStory,
    get_all_text_post,
};