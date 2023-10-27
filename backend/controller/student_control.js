const asyncHandler = require('express-async-handler');
const student = require('../models/studentModel');
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generatejwt')

//access public
//route api/student/auth

const auth_student = asyncHandler(async (req, res) => {
    res.status(404)
    throw new Error('Not found')
    res.status(201).json({
        message: "auth"
    })
})


//access public
//route api/student/register

const register_student = asyncHandler(async (req, res) => {
    const { name, surname, student_id, email, alt_email, password, skype_id, mobile_no, alt_mobile_no, gender, dob, father_name, mother_name, per_address, cur_address, tenth_percentage, twelve_percentage, cpi, current_backlog, total_backlog, branch, registering_for } = req.body;
    // console.log("ok");
    // const { email, alt_email } = req.body;
    // console.log(req.body);

    const studentExists = await student.findOne({
        student_id: student_id
    });
    // console.log(email, alt_email);
    if (studentExists) {
        res.status(400)
        throw new Error('Student already exists')
    }

    // console.log(test);
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const reg_student = await student.create({
        name: name,
        surname: surname,
        student_id: student_id,
        email: {
            main: email,
            alt: alt_email
        },
        password: password,
        skype_id: skype_id,
        phone_number: {
            main: mobile_no,
            alt: alt_mobile_no
        },
        gender: gender,
        dob: dob,
        father_name: father_name,
        mother_name: mother_name,
        address: {
            per_address: per_address,
            cur_address: cur_address
        },
        results: {
            tenth_percentage: tenth_percentage,
            twelve_percentage: twelve_percentage
        },
        cpi: cpi,
        academics: {
            branch: branch,
            current_backlogs: current_backlog,
            total_backlogs: total_backlog
        },
        registering_for: registering_for,
    })
    if (!reg_student) {
        res.status(400)
        throw new Error('Student not registered')
    }
    generateToken(res, reg_student._id);
    res.status(201).json({
        message: "register",
        name: reg_student.name,
        email: reg_student.email.main
    })
})

//access public
//route api/student/login

const login_student = asyncHandler(async (req, res) => {
    const { studentid, password } = req.body;
    const studentExists = await student.findOne({
        student_id: studentid
    });

    let isMatch = false;
    if (studentExists) {
        isMatch = await bcrypt.compare(password, studentExists.password);
    }
    if (!studentExists || !isMatch) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const tok = await generateToken(res, studentExists._id);
    console.log(tok);
    console.log("hurray")
    res.status(201).json({
        message: "login",
        name: studentExists.name,
        email: studentExists.email.main,
        token: tok
    })
})

//access private
//route api/student/logout

const log_out_student = asyncHandler(async (req, res) => {

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
//route api/student/profile


const get_student_profile = asyncHandler(async (req, res) => {
    // const stu=await student.findOne(req._id);
    const stu = {
        name: req.student.name,
        student_id: req.student.student_id
    }
    res.status(201).json({
        stu
    })
})

const update_student_profile = asyncHandler(async (req, res) => {
    // console.log(req);
    const studentExist = await student.findById(req.student._id)
    // console.log(studentExist.student_id)
    if (!studentExist) {
        res.status(400).json({
            message: "not logged in"
        })
    }
    if (req.body.student_id) {
        console.log('ok');
        studentExist.student_id = req.body.student_id
    }
    if (req.body.name) {
        studentExist.name = req.body.name
    }
    // console.log(studentExist.student_id)
    // console.log(studentExist.name) 
    const updatedStudent = await studentExist.save();
    res.status(201).json({
        student_id: updatedStudent.student_id,
        name: updatedStudent.name
    })

})

module.exports = {
    auth_student,
    register_student,
    log_out_student,
    login_student,
    get_student_profile,
    update_student_profile
};