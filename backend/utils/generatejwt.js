const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const generateToken = asyncHandler(async (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1m'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60* 1000,
        sameSite: 'strict',
    })

})

module.exports = generateToken;