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
    getRegStudentsOfJobProfile,
} = require('../controller/jobProfileController');
const protect = require('../middleware/authCompMiddleware.js');
const studentProtect = require('../middleware/authmiddleware.js');
const { validateJobProfile } = require('../middleware/validatemiddleware.js');

router.route('/').post(protect, createJobProfile).get(getAllJobProfiles);
router.route('/:id').get(getJobProfileById).put(validateJobProfile, updateJobProfile).delete(deleteJobProfile);
router.route('/:id/:stuId').post(studentProtect, registerToJobprofile);
router.route('/:id/:stuId').delete(studentProtect, deregisterFromJobprofile);
router.route('/shortlist/:id/:stuId').put(protect, addToShortlisted);
router.route('/shortlist/:id/:stuId').delete(removeFromShortlisted);
router.route('/company/:id').get(protect, getJobProfilesOfCompany);
router.route('/regstudent/:id').get(getRegStudentsOfJobProfile)
module.exports = router;