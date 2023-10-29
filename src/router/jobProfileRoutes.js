const express = require('express');
const router = express.Router();
const {
    createJobProfile,
    getAllJobProfiles,
    getJobProfileById,
    updateJobProfile,
    deleteJobProfile
} = require('../controller/jobProfileController');
const protect = require('../middleware/authmiddleware');
const { validateJobProfile } = require('../middleware/validatemiddleware.js');

router.route('/').post(protect, validateJobProfile, createJobProfile).get(protect, getAllJobProfiles);
router.route('/:id').get(protect, getJobProfileById).put(protect, validateJobProfile, updateJobProfile).delete(protect, deleteJobProfile);

module.exports = router;