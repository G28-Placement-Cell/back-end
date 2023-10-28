const { validationResult } = require('express-validator');

const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

const sendSuccessResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
};