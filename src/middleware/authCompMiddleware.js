const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const company = require('../models/companyModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.company = await company.findById(decoded.id).select('-password');
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