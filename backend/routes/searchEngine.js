// routes/searchRoutes.js

const express = require("express");
const router = express.Router();
const { searchAll } = require("../controllers/SearchOIngine");

router.get("/search", searchAll);

module.exports = router;
