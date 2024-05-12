const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'gaurav@';

router.post('/register', async function(req, res) {
    const { email, password } = req.body;
    const db = req.app.locals.db;

    try {
        const existingUser = await db.collection('Users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already used' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            password: hashedPassword,
            created_on: new Date(),
            isActive: true
        };
        await db.collection('Users').insertOne(newUser);

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async function(req, res) {
    const { email, password } = req.body;
    const db = req.app.locals.db;

    try {
        const user = await db.collection('Users').findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Login successful', user: { email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/allusers', async function(req, res) {
    const db = req.app.locals.db;

    try {
        const users = await db.collection('Users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
