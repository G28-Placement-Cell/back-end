const express = require('express');
const router = express.Router();
const { auth_student, register_student, log_out_student, login_student, get_student_profile } = require('../controller/student_control');


router.post('/auth', auth_student);
router.post('/register', register_student);
router.post('/logout', log_out_student);
router.post('/login', login_student);
router.get('/profile', get_student_profile);

module.exports = router;