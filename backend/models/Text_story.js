const mongoose = require("mongoose");
const textStorySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TextStory", textStorySchema);
