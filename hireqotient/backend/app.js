const express = require('express');
const cors = require('cors');
const app = express();

const port = 7000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const { dbConnectionFn } = require('./config/dbconfig');
(async () => {
    try {
        const { client, database } = await dbConnectionFn();
        app.locals.db = client.db(database);
        console.log(`Connected to MongoDB database: ${database}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
})();

app.get('/', function(req, res) {
    res.send('Hello World');
});

// Register router
const registerRouter = require('./routers/auth');
app.use(registerRouter);


// Protected route
const verifyToken = require('./middlewares/verifyToken');

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});
