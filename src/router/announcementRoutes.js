const express = require('express');
const router = express.Router();
const {
    createAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncementsByAdminForStudent,
    getAnnouncementsByAdminForCompany,
    createAnnouncementByAdminForCompany,
    createAnnouncementByAdminForStudent,
    getAnnouncementsByAllCompanies,
    getAnnouncementsByCompanyId
} = require('../controller/announcementController');
const protect = require('../middleware/authmiddleware');
const { validateAnnouncement } = require('../middleware/validatemiddleware.js');

router.route('/').post(validateAnnouncement, createAnnouncement)
router.route('/').get(getAllAnnouncements);
router.route('/:id').get(getAnnouncementById)
router.route('/:id').put(validateAnnouncement, updateAnnouncement)
router.route('/:id').delete(deleteAnnouncement);
router.route('/admin/company').get(getAnnouncementsByAdminForCompany);
router.route('/admin/student').get(getAnnouncementsByAdminForStudent)
router.route('/admin/student').post(createAnnouncementByAdminForStudent);
router.route('/admin/company').post(createAnnouncementByAdminForCompany);
router.route('/admin/companyAnnouncements').get(getAnnouncementsByAllCompanies);
router.route('/company/:id').get(getAnnouncementsByCompanyId);

module.exports = router;