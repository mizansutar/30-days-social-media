const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connect');
const userRouter = require('./routes/user_router');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const ImageRouter = require('./routes/image');
const PostRouter = require('./routes/Post_routes');
const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
    origin: "*", // Replace with your frontend URL
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
app.use('/api/posts', PostRouter);

app.listen(PORT, () => {
    // Connect to the database
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
