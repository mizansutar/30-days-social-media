const express = require("express");
const {createTextStory} = require("../controllers/Text_storyCont");
const authMiddleware = require("../midleWares/UserMidel");

const router = express.Router();
// Route to create a text story

router.post("/create", authMiddleware, createTextStory);
module.exports = router;