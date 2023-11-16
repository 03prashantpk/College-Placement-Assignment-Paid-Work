const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 7000;
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const connectMongoDB = require('./config/connection');


app.use(express.json());

// Configure CORS to allow requests from any origin during development
const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));


// Your registration route
app.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;
    const db = await connectMongoDB();
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Ensure that you include 'name' and 'email' when inserting into the collection
    await users.insertOne({ name, email, username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully'  + req.body });
});

// Your login route
app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const db = await connectMongoDB();
    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});