const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connect');
const userRouter = require('./routes/user_router');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const ImageRouter = require('./routes/image');
const VideoRouter = require('./routes/video');



const PostRouter = require('./routes/Post_routes');
const PollRouter = require('./routes/poll_routes');
const TextStoryRouter = require('./routes/Text_story');
const Video_postingRouter= require('./routes/Video_posting');



const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Import routes

//const storage=multer.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({ storage });


app.use('/api/users', userRouter);
app.use('/api/images', ImageRouter);
app.use('/api/videos', VideoRouter);
app.use('/api/posts', PostRouter);
app.use('/api/text-stories', TextStoryRouter);
app.use('/api/video-posts', Video_postingRouter);
app.use('/api/polls', PollRouter);

app.listen(PORT, () => {
    // Connect to the database
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
