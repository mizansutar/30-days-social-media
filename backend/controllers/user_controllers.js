const User = require('../models/user_model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadImage } = require("../services/images_saver");


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
    const token = jwt.sign({ id: user._id }, "mizan", { expiresIn: '1h' });
    console.log("Token generated:", token);
    


    res.status(200).json({
      message: "Login successful",
      token: token,
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


const updateProfile = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { bio } = req.body;
    const file = req.file;

    let imageUrl;
    if (file) {
      imageUrl = await uploadImage(file);
    }

    const user = await User.findByIdAndUpdate(
      authorId,
      {
        $set: {
          profilePicture: imageUrl,
          bio: bio
        }
      },
      { new: true }  // ensures updated document is returned :contentReference[oaicite:1]{index=1}
    );

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
  }
};

const recommendationUser = async (req, res) => {
  const currentUserId = req.user.id;

  try {
    const currentUser = await User.findById(currentUserId).select('following').lean();

    const users = await User.find({
      _id: { 
        $ne: currentUserId, 
        $nin: currentUser.following || [] 
      }
    }).select('-password').lean();

    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  recommendationUser,
};
