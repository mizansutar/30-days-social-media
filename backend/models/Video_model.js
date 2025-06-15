const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    mediaUrl: {
      type: String, // URL or file path to image/video
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],
    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);


videoSchema.index({ description: "text" });

Video = mongoose.model("Video_model", videoSchema);

module.exports = Video;
