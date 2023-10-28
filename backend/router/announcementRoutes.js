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

router.route('/').post(protect, validateAnnouncement, createAnnouncement).get(protect, getAllAnnouncements);
router.route('/:id').get(protect, getAnnouncementById).put(protect, validateAnnouncement, updateAnnouncement).delete(protect, deleteAnnouncement);

module.exports = router;