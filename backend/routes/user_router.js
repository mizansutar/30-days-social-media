const router = require('express').Router();
const { registerUser,loginUser } = require('../controllers/user_controllers.js');

// Route to register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);

// Additional routes can be added here
// Export the router
module.exports = router;
// This router handles user-related routes, such as registration and login.