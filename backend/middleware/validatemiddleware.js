const { validationResult, check } = require('express-validator');

// Middleware to validate job profile data when creating or updating
const validateJobProfile = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('salary').isNumeric().withMessage('Salary must be a number'),
    check('bond').isNumeric().withMessage('Bond must be a number'),
    check('location').not().isEmpty().withMessage('Location is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    },
];

// Middleware to validate announcement data when creating or updating
const validateAnnouncement = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('date').not().isEmpty().withMessage('Date is required'),
    check('file').not().isEmpty().withMessage('File is required'),
    check('sent_to').not().isEmpty().withMessage('Sent to is required'),
    check('is_company_announcement').not().isEmpty().withMessage('Is company announcement is required'),
    check('company').not().isEmpty().withMessage('Company is required'),
    check('job_profile').not().isEmpty().withMessage('Job profile is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    },
];

module.exports = {
    validateJobProfile,
    validateAnnouncement,
};