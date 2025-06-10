const router = require('express').Router();
const { registerUser,loginUser,updateProfile, recommendationUser} = require('../controllers/user_controllers.js');
const multer = require("multer");
const authMiddleware = require("../midleWares/UserMidel");
const upload = multer();

// Route to register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/profile/update",authMiddleware, upload.single("file"),updateProfile)
router.get("/recommendationUser",authMiddleware,recommendationUser)

// Additional routes can be added here
// Export the router
module.exports = router;
// This router handles user-related routes, such as registration and login.