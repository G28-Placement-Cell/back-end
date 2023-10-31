const { validationResult, check } = require('express-validator');

// Middleware to validate job profile data when creating or updating
const validateJobProfile = [
    check('company_name').not().isEmpty().withMessage('Company name is required'),
    check('offer_type').not().isEmpty().withMessage('Offer type is required'),
    check('location').not().isEmpty().withMessage('Location is required'),
    check('open_for').not().isEmpty().withMessage('Open for is required'),
    check('cpi_criteria').not().isEmpty().withMessage('CPI criteria is required'),
    check('ctc').not().isEmpty().withMessage('CTC is required'),
    check('registration_start_date').not().isEmpty().withMessage('Registration start date is required'),
    check('registration_end_date').not().isEmpty().withMessage('Registration end date is required'),
    check('job_description').not().isEmpty().withMessage('Job description is required'),
    // check('job_description_file').not().isEmpty().withMessage('Job description file is required'),

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