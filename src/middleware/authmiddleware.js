const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const student = require('../models/studentModel');

const protect = asyncHandler(async (req, res, next) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await student.findById(decoded.id).select('-password');
            // console.log(req.student)
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