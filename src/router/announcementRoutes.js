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
    getAnnouncementsByCompanyId,
    createAnnouncementByCompanyForStudent
} = require('../controller/announcementController');
const protect = require('../middleware/authmiddleware');
const compprotect = require('../middleware/authCompMiddleware.js');
const adminprotect = require('../middleware/authAdminMiddleware.js');
const { validateAnnouncement } = require('../middleware/validatemiddleware.js');

router.route('/').post(validateAnnouncement, createAnnouncement)
router.route('/').get(getAllAnnouncements);
router.route('/:id').get(getAnnouncementById)
router.route('/:id').put(validateAnnouncement, updateAnnouncement)
router.route('/:id').delete(deleteAnnouncement);
router.route('/admin/company').get(adminprotect, getAnnouncementsByAdminForCompany);
router.route('/admin/company/company').get(compprotect, getAnnouncementsByAdminForCompany);
router.route('/admin/student').get(adminprotect, getAnnouncementsByAdminForStudent);
router.route('/admin/student/student').get(protect, getAnnouncementsByAdminForStudent);
router.route('/admin/student').post(adminprotect,createAnnouncementByAdminForStudent);
router.route('/admin/company').post(compprotect,createAnnouncementByAdminForCompany);
router.route('/admin/companyAnnouncements').get(adminprotect,getAnnouncementsByAllCompanies);
router.route('/student/companyAnnouncements').get(protect,getAnnouncementsByAllCompanies);

router.route('/company/:id').get(compprotect,getAnnouncementsByCompanyId);
router.route('/company/:id').post(compprotect,createAnnouncementByCompanyForStudent);


module.exports = router;