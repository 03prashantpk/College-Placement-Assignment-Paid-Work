const jwt = require('jsonwebtoken');
const secretKey = 'gaurav@';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
