const express = require('express');
const router = express.Router();
const protect = require('../middleware/authCompMiddleware');
const protectStudent = require('../middleware/authmiddleware');
const protectAdmin = require('../middleware/authAdminMiddleware');
const {
    authCompany,
    registerCompany,
    loginCompany,
    getCompanyProfile,
    logOutCompany,
    getCompanyName,
    change_password,
    // addJobProfile,
    // viewJobProfile,
    // viewJobProfileById,
    // deleteJobProfileById,
    // updateJobProfileById,
    // applyJobProfileById,
    // viewApplicantsById,
    // announceResultById,
    // addAnnouncement,
    // viewAnnouncement,
    // viewAnnouncementById,
    // deleteAnnouncementById,
    // updateAnnouncementById,
    // viewStudentsByJobProfileId
    verify,
    reject,
    getregcompany,
    getpencompany
} = require('../controller/companyController');

router.post('/auth', authCompany);
router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/profile', protect, getCompanyProfile);
router.get('/student/:id', protectStudent, getCompanyProfile);
router.post('/logout', logOutCompany);
router.get('/name/:id', getCompanyName);
// router.post('/jobprofile', protect, addJobProfile);
// router.get('/jobprofile', protect, viewJobProfile);
// router.get('/jobprofile/:id', protect, viewJobProfileById);
// router.delete('/jobprofile/:id', protect, deleteJobProfileById);
// router.put('/jobprofile/:id', protect, updateJobProfileById);
// router.post('/jobprofile/:id', protect, applyJobProfileById);
// router.get('/applicants/:id', protect, viewApplicantsById);
// router.put('/announceresult/:id', protect, announceResultById);
// router.post('/announcement', protect, addAnnouncement);
// router.get('/announcement', protect, viewAnnouncement);
// router.get('/announcement/:id', protect, viewAnnouncementById);
// router.delete('/announcement/:id', protect, deleteAnnouncementById);
// router.put('/announcement/:id', protect, updateAnnouncementById);
// router.get('/studentsbyjobprofileid/:id', protect, viewStudentsByJobProfileId);
router.post('/verify', protectAdmin, verify);
router.post('/reject', protectAdmin, reject);
router.get('/getregcompany', protectAdmin, getregcompany);
router.get('/getpencompany', protectAdmin, getpencompany);
router.post('/change_password', protect, change_password);

module.exports = router;
