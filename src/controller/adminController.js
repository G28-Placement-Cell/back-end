const asyncHandler = require('express-async-handler');
const admin = require('../models/adminModel');
const studentModel = require('../models/studentModel');
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generatejwt')

//access public
//route api/admin/auth

const auth_admin = asyncHandler(async (req, res) => {
    res.status(404)
    throw new Error('Not found')
    res.status(201).json({
        message: "auth"
    })
})


//access public
//route api/admin/register

const register_admin = asyncHandler(async (req, res) => {
    const { user_name, email, password } = req.body;

    const adminExists = await admin.findOne({
        user_name: user_name
    });

    if (adminExists) {
        res.status(400)
        throw new Error('admin already exists')
    }

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const reg_admin = await admin.create({
        user_name: user_name,
        email: email,
        password: password,
    })
    if (!reg_admin) {
        res.status(400)
        throw new Error('admin not registered')
    }
    const tok = await generateToken(res, reg_admin._id);
    res.status(201).json({
        message: "register",
        _id: reg_admin._id,
        // name: reg_admin.name,
        // email: reg_admin.email.main
        email: reg_admin.email,
        token: tok
    })
})

//access public
//route api/admin/login

const login_admin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const adminExists = await admin.findOne({
        email: email
    });

    let isMatch = false;
    if (adminExists) {
        isMatch = await bcrypt.compare(password, adminExists.password);
    }
    if (!adminExists || !isMatch) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const tok = await generateToken(res, adminExists._id);
    console.log(tok);
    console.log("hurray")
    res.status(201).json({
        message: "login",
        _id: adminExists._id,
        // name: adminExists.name,
        // email: adminExists.email.main,
        email: adminExists.email,
        token: tok
    })
})

//access private
//route api/admin/logout

const log_out_admin = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    // localStorage.removeItem('token');

    res.status(201).json({
        message: "logged out"
    })
})


//access private
//route api/admin/change_password

const change_password = asyncHandler(async (req, res) => {
    // console.log(req.admin);
    console.log(req.body);
    console.log(req.admin)
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const adm = await admin.findById(req.admin._id);

    let isMatch = false;
    if (adm) {
        isMatch = await bcrypt.compare(currentPassword, adm.password);
    }
    if (!adm || !isMatch) {
        res.status(400)
        throw new Error('Enter valid current password')
    }
    if (newPassword !== confirmPassword) {
        res.status(400)
        throw new Error('New password and confirm password do not match')
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    let check = await bcrypt.compare(newPassword, adm.password);
    if (check) {
        res.status(400)
        throw new Error('New password cannot be same as current password')
    }
    const updatedadmin = await admin.findByIdAndUpdate(req.admin._id, { password: hashedPassword }, { new: true });
    res.status(201).json({
        message: "password changed",
        updatedadmin
    })

})

const update_admin_profile = asyncHandler(async (req, res) => {
    // console.log(req);
    const adminExist = await admin.findById(req.admin._id)
    // console.log(adminExist.admin_id)
    if (!adminExist) {
        res.status(400).json({
            message: "not logged in"
        })
    }
    if (req.body.admin_id) {
        console.log('ok');
        adminExist.admin_id = req.body.admin_id
    }
    if (req.body.name) {
        adminExist.name = req.body.name
    }
    // console.log(adminExist.admin_id)
    // console.log(adminExist.name) 
    const updatedadmin = await adminExist.save();
    res.status(201).json({
        admin_id: updatedadmin.admin_id,
        name: updatedadmin.name
    })

})

const get_all_job_profiles = asyncHandler(async (req, res) => {
    const job = await jobprofile.find({});
    res.status(201).json({
        job
    })

})

const getStudent = asyncHandler(async (req, res) => {
    const student = await studentModel.findById(req.params.id);
    if (!student) {
        res.status(400)
        throw new Error('Student not found')
    }
    res.status(201).json({
        student
    })

})

module.exports = {
    auth_admin,
    register_admin,
    log_out_admin,
    login_admin,
    change_password,
    getStudent,
};