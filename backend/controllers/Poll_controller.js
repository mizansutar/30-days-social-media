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

        await User.findByIdAndUpdate(
            authorId,
            { $push: { posts: savedPoll._id } },
            { new: true }
        );


        return res.status(201).json({ msg: "Poll created successfully", poll: savedPoll, success: true });
    } catch (error) {
        console.error("Error creating poll:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const all_post_poll = async (req, res) => {
  try {
    const authorId = req.user.id;
    const polls = await Poll.find({ author: authorId }); // fetch polls for the user

    return res.status(200).json({
      success: true,
      polls,  // array of Poll documents
    });
  } catch (err) {
    console.error('Error fetching user polls:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


module.exports = { createPoll, all_post_poll};
