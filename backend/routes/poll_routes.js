const { createPoll ,all_post_poll} = require("../controllers/Poll_controller");
const express = require("express");

const authMiddleware = require("../midleWares/UserMidel");

const router = express.Router();


router.post("/create", authMiddleware, createPoll);
router.get("/allpolls",authMiddleware,all_post_poll);

module.exports = router;