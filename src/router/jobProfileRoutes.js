const express = require('express');
const router = express.Router();
const {
    createJobProfile,
    getAllJobProfiles,
    getJobProfileById,
    updateJobProfile,
    deleteJobProfile,
    registerToJobprofile,
    deregisterFromJobprofile,
    addToShortlisted,
    removeFromShortlisted,
    getJobProfilesOfCompany,
} = require('../controller/jobProfileController');
const protect = require('../middleware/authmiddleware');
const { validateJobProfile } = require('../middleware/validatemiddleware.js');

router.route('/').post(validateJobProfile, protect, createJobProfile).get(getAllJobProfiles);
router.route('/:id').get(getJobProfileById).put(validateJobProfile, updateJobProfile).delete(deleteJobProfile);
router.route('/:id/:stuId').post(protect, registerToJobprofile);
router.route('/:id/:stuId').delete(protect, deregisterFromJobprofile);
router.route('/shortlist/:id/:stuId').put(protect, addToShortlisted);
router.route('/shortlist/:id/:stuId').delete(removeFromShortlisted);
router.route('/company/:id').get(protect, getJobProfilesOfCompany);

module.exports = router;