const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  connectDB = require('./connect'); 
const userRouter = require('./routes/user_router');
const cookieParser=require("cookie-parser") ;
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Import routes
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

app.listen(PORT, () => {
    // Connect to the database
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
