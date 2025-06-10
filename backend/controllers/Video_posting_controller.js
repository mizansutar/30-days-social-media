const Video_posting = require('../models/Video_model');
const mongoose = require('mongoose');
const videoSaver = require('../services/video_saver');
const User = require('../models/user_model');
const Url = "http://localhost:5000";
const createVideoPost = async (req, res) => {
    try {
        const { description, privacy } = req.body;
        const authorId = req.user.id;
        const file = req.file;
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!file) {
            return res.status(400).json({ message: "Video file is required" });
        }

        const videoUrl = await videoSaver.uploadVideo(file);
        if (videoUrl.error) {
            return res.status(500).json({ message: videoUrl.error });
        }

        const newVideoPost = new Video_posting({
            description,
            mediaUrl: videoUrl,
            privacy,
            author: authorId
        });

        await newVideoPost.save();
         await User.findByIdAndUpdate(
              authorId,
              { $push: { posts: newVideoPost._id } },
              { new: true }
            );
        return res.status(201).json({ msg: "Video post created successfully", videoPost: newVideoPost, success: true });
    } catch (error) {
        console.error("Error creating video post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const all_get_video=async(req,res)=>{
     try {
        const authorId = req.user.id;
        const allIVidPost = await Video_posting.find({ author: authorId });
        res.status(200).json({ msg: "all data", reels: allIVidPost, success: true });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch text posts' });
      }
}






module.exports = {
    createVideoPost,
    all_get_video,
};