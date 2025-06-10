const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connect');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

// Global exports
const onlineUsers = new Map();
global.io = io;
global.onlineUsers = onlineUsers;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', require('./routes/user_router'));
app.use('/api/images', require('./routes/image'));
app.use('/api/videos', require('./routes/video'));
app.use('/api/posts', require('./routes/Post_routes'));
app.use('/api/text-stories', require('./routes/Text_story'));
app.use('/api/video-posts', require('./routes/Video_posting'));
app.use('/api/polls', require('./routes/poll_routes'));
app.use('/api/users/f', require("./routes/follow"));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`Registered: ${userId} -> ${socket.id}`);
  });

  socket.on("disconnect", () => {
    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Server start
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running with sockets on port ${PORT}`);
});
