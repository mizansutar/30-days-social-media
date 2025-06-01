const Poll = require("../models/poll_saving");
const User = require("../models/user_model");

const createPoll = async (req, res) => {
    try {
        const { question, options, correctOptionIndex, privacy } = req.body;
        const authorId = req.user.id;
console.log("question:", question);
        console.log("options:", options);
        console.log("correctOptionIndex:", correctOptionIndex);
        if (!question || !options || options.length < 2) {
        return res.status(400).json({ message: "Question and options are required" });
        }
    
        const newPoll = new Poll({
        question,
        options,
        correctOptionIndex,
        privacy,
        author: authorId
        });
        const savedPoll = await newPoll.save();
        return res.status(201).json({ msg: "Poll created successfully", poll: savedPoll ,success: true});
    } catch (error) {
        console.error("Error creating poll:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createPoll };
