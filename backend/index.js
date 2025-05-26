const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  connectDB = require('./connect'); // Import the database connection module
const userRouter = require('./routes/user_router'); // Import user routes
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
