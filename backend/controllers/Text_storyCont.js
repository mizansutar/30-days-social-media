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
        return res.status(201).json({ msg: "Text story created successfully", success: true, data: savedTextStory });
    } catch (error) {
        console.error("Error creating text story:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createTextStory
};