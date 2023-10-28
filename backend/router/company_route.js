const express = require('express');
const router = express.Router();
const protect = require('../middleware/authmiddleware');
const {
    authCompany,
    registerCompany,
    loginCompany,
    getCompanyProfile,
    logOutCompany,
    addJobProfile,
    viewJobProfile,
    viewJobProfileById,
    deleteJobProfileById,
    updateJobProfileById,
    applyJobProfileById,
    viewApplicantsById,
    announceResultById,
    addAnnouncement,
    viewAnnouncement,
    viewAnnouncementById,
    deleteAnnouncementById,
    updateAnnouncementById,
    viewStudentsByJobProfileId
} = require('../controller/company_control');

router.post('/auth', authCompany);
router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/profile', protect, getCompanyProfile);
router.post('/logout', logOutCompany);
router.post('/addjobprofile', protect, addJobProfile);
router.get('/viewjobprofile', protect, viewJobProfile);
router.get('/viewjobprofile/:id', protect, viewJobProfileById);
router.delete('/deletejobprofile/:id', protect, deleteJobProfileById);
router.put('/updatejobprofile/:id', protect, updateJobProfileById);
router.post('/applyjobprofile/:id', protect, applyJobProfileById);
router.get('/viewapplicants/:id', protect, viewApplicantsById);
router.put('/announceresult/:id', protect, announceResultById);
router.post('/addannouncement', protect, addAnnouncement);
router.get('/viewannouncement', protect, viewAnnouncement);
router.get('/viewannouncement/:id', protect, viewAnnouncementById);
router.delete('/deleteannouncement/:id', protect, deleteAnnouncementById);
router.put('/updateannouncement/:id', protect, updateAnnouncementById);
router.get('/viewstudentsbyjobprofileid/:id', protect, viewStudentsByJobProfileId);

module.exports = router;