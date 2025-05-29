const Post_images = require("../models/Post_images");
const User = require("../models/user_model");
const axios = require("axios");
const { uploadImage } = require("../services/images_saver");
const CreatePost_Image = async (req, res) => {
    try {

        const { description, privacy } = req.body;
        const File = req.file;
        if (!File) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        if (!description || !privacy) {
            return res.status(400).json({ message: "Description, privacy, and mediaUrl are required" });
        }
        const authorId = "6838688c2feeeb517783b7dc";
        const mediaUrl = await uploadImage(File);
        const newPost = new Post_images({
            description,
            privacy,
            mediaUrl,
            author: authorId
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}


module.exports = CreatePost_Image;