const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const generateToken = asyncHandler(async (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    })
    // res.cookie('jwt', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     maxAge: 60 * 1000,
    //     sameSite: 'strict',
    // })
    return token;

})

module.exports = generateToken;