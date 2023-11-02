const express = require('express');
const router = express.Router();
const { auth_admin, register_admin, login_admin, log_out_admin } = require('../controller/adminController');
const protect = require('../middleware/authmiddleware');
const { register_student } = require('../controller/student_control');


router.post('/auth', auth_admin);
router.post('/register', register_admin);
router.post('/logout', log_out_admin);
router.post('/login', login_admin);

module.exports = router;