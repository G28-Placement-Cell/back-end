const asyncHandler = require('express-async-handler');
const student = require('../models/studentModel');

//access public
//route api/student/auth
//desc auth student
const auth_student = asyncHandler(async (req, res) => {
    res.status(404)
    throw new Error('Not found')
    res.status(201).json({
        message: "auth"
    })
})


//access public
//route api/student/register
//desc register student
const register_student = asyncHandler(async (req, res) => {
    const { name, surname, student_id, email, alt_email, password, conf_password, skype_id, mobile_no, alt_mobile_no, gender, dob, father_name, mother_name, per_address, cur_address, tenth_percentage, twelve_percentage, cpi, current_backlog, total_baccklog, branch, registering_for, domain } = req.body;
    // console.log("ok");
    // const { email, alt_email } = req.body;
    // console.log(req.body);

    const test = {
        type: {
            main: email,
            alt: alt_email
        }
    }
    const studentExists = await student.findOne({ test });
    // console.log(email, alt_email);
    if (studentExists) {
        res.status(400)
        throw new Error('Student already exists')
    }

    // console.log(test);
    const reg_student = await student.create({
        name: name,
        surname: surname,
        student_id: student_id,
        email: {
            type: {
                main: email,
                alt: alt_email
            }
        },

    })
    res.status(201).json({
        message: "register",
        test
    })
})

//access public
//route api/student/login
//desc login student
const login_student = asyncHandler(async (req, res) => {

    res.status(201).json({
        message: "login"
    })
})

//access private
//route api/student/logout
//desc logout student
const log_out_student = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: "logout"
    })
})

//access private
//route api/student/profile
//desc profile student

const get_student_profile = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: "profile"
    })
})

module.exports = {
    auth_student,
    register_student,
    log_out_student,
    login_student,
    get_student_profile
};