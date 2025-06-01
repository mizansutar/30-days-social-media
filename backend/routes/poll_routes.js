const { createPoll } = require("../controllers/Poll_controller");
const express = require("express");

const authMiddleware = require("../midleWares/UserMidel");

const router = express.Router();


router.post("/create", authMiddleware, createPoll);

module.exports = router;