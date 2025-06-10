const express = require("express");
const {createTextStory,get_all_text_post} = require("../controllers/Text_storyCont");
const authMiddleware = require("../midleWares/UserMidel");

const router = express.Router();
// Route to create a text story

router.post("/create", authMiddleware, createTextStory);
router.get("/user/posts", authMiddleware,get_all_text_post );
module.exports = router;