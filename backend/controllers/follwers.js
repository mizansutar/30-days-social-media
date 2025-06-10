const User = require('../models/user_model');


const followUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  if (userId === currentUserId)
    return res.status(400).json({ msg: "Can't follow yourself" });

  try {
    // Update follow relationships
    await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: userId } });
    await User.findByIdAndUpdate(userId, { $addToSet: { followers: currentUserId } });

    // Fetch current (follower) user's name & bio
    const currentUser = await User.findById(currentUserId).select("username bio");

    const targetSocket = global.onlineUsers.get(userId);
    console.log(currentUser.username)
    if (targetSocket) {
      global.io.to(targetSocket).emit("notification", {
        type: "follow",
        message: `${currentUser.username} started following you`,
        fromUserId: currentUserId,
        name: currentUser.username,
        bio: currentUser.bio || "",
      });
    }

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

  await User.findByIdAndUpdate(currentUserId, { $pull: { following: userId } });
  await User.findByIdAndUpdate(userId, { $pull: { followers: currentUserId } });

  res.json({ msg: "Unfollowed" });
};

module.exports = {
  followUser,
  unfollowUser
};
