const User = require('../models/user_model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const Thisuser = await User.findOne({ email });


    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "mizan", { expiresIn: '1h' });
    console.log("Token generated:", token);
    res.status(201).json({ message: 'User registered successfully', success: true ,token: token, user: Thisuser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is inactive" });
    }

    // Create token here (optional)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        isActive: user.isActive
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
