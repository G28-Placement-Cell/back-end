const express = require('express');
const router = express.Router();
const { auth_admin, register_admin, login_admin, log_out_admin,change_password, getStudent, getCompany } = require('../controller/adminController');
const protectAdmin = require('../middleware/authAdminMiddleware');
const { get } = require('mongoose');



router.post('/auth', auth_admin);
router.post('/register', register_admin);
router.post('/logout', log_out_admin);
router.post('/login', login_admin);
router.post('/change_password', protectAdmin, change_password);
router.get('/getStudent/:id', getStudent);
router.get('/getCompany/:id', getCompany);

module.exports = router;