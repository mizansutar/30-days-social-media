const express = require("express");
const { followUser, unfollowUser } = require("../controllers/follwers");
const authMiddleware = require("../midleWares/UserMidel");
const router = express.Router();

router.post("/:userId/follow", authMiddleware, followUser);
router.post("/:userId/unfollow", authMiddleware, unfollowUser);

module.exports = router;