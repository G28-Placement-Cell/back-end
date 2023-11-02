const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const admin = require('../models/adminModel');

const protectAdmin = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await admin.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

module.exports = protectAdmin;