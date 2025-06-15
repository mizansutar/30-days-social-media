const mongoose = require("mongoose");
const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
   options: [
        {
          text: {
            type: String,
            required: true,
          },
          votes: {
            type: Number,
            default: 0,
          },
        },
      ],
      correctOptionIndex: {
        type: Number,
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
    votes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        optionIndex: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

PollSchema.index({ question: "text" });


module.exports = mongoose.model("Poll", PollSchema);
