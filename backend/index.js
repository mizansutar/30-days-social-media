const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const connectDB = require('./connect');


const searchRoutes=require("./routes/searchEngine")

// Models (still available if needed)
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/users', require('./routes/user_router'));
app.use('/api/images', require('./routes/image'));
app.use('/api/videos', require('./routes/video'));
app.use('/api/posts', require('./routes/Post_routes'));
app.use('/api/text-stories', require('./routes/Text_story'));
app.use('/api/video-posts', require('./routes/Video_posting'));
app.use('/api/polls', require('./routes/poll_routes'));
app.use('/api/users/f', require("./routes/follow"));
app.use('/api/messages', require('./routes/messages')); 
app.use("/api", searchRoutes);


// Start server and connect DB
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
