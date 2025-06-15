const User = require('../models/user_model');

const followUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  if (userId === currentUserId)
    return res.status(400).json({ msg: "Can't follow yourself" });

  try {
    await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: userId } });
    await User.findByIdAndUpdate(userId, { $addToSet: { followers: currentUserId } });

    res.json({ msg: "Followed" });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  if (userId === currentUserId)
    return res.status(400).json({ msg: "Can't unfollow yourself" });

  try {
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { followers: currentUserId } });

    res.json({ msg: "Unfollowed" });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  followUser,
  unfollowUser
};
