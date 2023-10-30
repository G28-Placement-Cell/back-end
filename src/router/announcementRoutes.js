const express = require('express');
const router = express.Router();
const {
    createAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
} = require('../controller/announcementController');
const protect = require('../middleware/authmiddleware');
const { validateAnnouncement } = require('../middleware/validatemiddleware.js');

router.route('/').post(validateAnnouncement, createAnnouncement).get(getAllAnnouncements);
router.route('/:id').get(getAnnouncementById).put(validateAnnouncement, updateAnnouncement).delete(deleteAnnouncement);

module.exports = router;