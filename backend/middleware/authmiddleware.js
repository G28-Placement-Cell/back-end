const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const student = require('../models/studentModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await student.findById(decoded.id).select('-password');
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

module.exports = protect;