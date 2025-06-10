const {CreatePost_Image,get_all_image_post}= require("../controllers/Post_Images");
const express = require("express");
const multer = require("multer");
const authMiddleware = require("../midleWares/UserMidel");

const router = express.Router();
const upload = multer();

router.post("/create", authMiddleware, upload.single("file"), CreatePost_Image);
router.get("/user/getallpost",authMiddleware,get_all_image_post)

module.exports = router;