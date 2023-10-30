const express = require('express');
const router = express.Router();
const protect = require('../middleware/authCompMiddleware');
const {
    authCompany,
    registerCompany,
    loginCompany,
    getCompanyProfile,
    logOutCompany,
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
} = require('../controller/companyController');

router.post('/auth', authCompany);
router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/profile/:id', protect, getCompanyProfile);
router.post('/logout', logOutCompany);
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

module.exports = router;