const CreatePost= require("../controllers/Post_Images");
const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

router.post("/create", upload.single("file"), CreatePost);

module.exports = router;