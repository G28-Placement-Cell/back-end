const express = require('express');
const router = express.Router();
const { auth_student, register_student, log_out_student, login_student, get_student_profile, update_student_profile, get_all_job_profiles, change_password } = require('../controller/student_control');
const protect = require('../middleware/authmiddleware');
const { upload, gridFSMiddleware } = require('../middleware/fileMiddleware');
router.post('/auth', auth_student);
// router.post('/register',upload.single('resume'),gridFSMiddleware , register_student);
router.post('/register', register_student);
router.post('/logout', log_out_student);
router.post('/login', login_student);
router.get('/profile', protect, get_student_profile);
router.put('/profile', protect, update_student_profile);
router.get('/jobprofile', get_all_job_profiles);
router.post('/change_password', protect, change_password);

module.exports = router;