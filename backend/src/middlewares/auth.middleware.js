const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded user payload to the request
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token.' });
    }
    return next();
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'System Administrator') {
        next();
    } else {
        res.status(403).json({ message: 'Requires Admin Role!' });
    }
};

const isStoreOwner = (req, res, next) => {
    if (req.user && req.user.role === 'Store Owner') {
        next();
    } else {
        res.status(403).json({ message: 'Requires Store Owner Role!' });
    }
};


module.exports = { verifyToken, isAdmin, isStoreOwner };


