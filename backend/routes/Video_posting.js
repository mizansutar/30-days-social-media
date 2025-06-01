const CreatePost = require("../controllers/Video_posting_controller");
const express = require("express");
const multer = require("multer");
const authMiddleware = require("../midleWares/UserMidel");

const router = express.Router();
const upload = multer();

router.post("/create", authMiddleware, upload.single("file"), CreatePost.createVideoPost);

module.exports = router;