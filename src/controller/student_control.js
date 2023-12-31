const asyncHandler = require('express-async-handler');
const student = require('../models/studentModel');
const jobprofile = require('../models/jobProfileModel');
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
    const { name, surname, student_id, fath_name, moth_name, permanent_address, current_address, cpi, current_backlogs, total_backlogs, skype_id, phone, alt_phone, dob, tenth_percentage, twelth_percentage, branch, domain, regfor, email, password, altemail, altpassword, gender } = req.body;
    // console.log("ok");
    // const { email, alt_email } = req.body;
    // console.log(req.body);
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
            alt: altemail
        },
        password: password,
        skype_id: skype_id,
        gender: gender,
        dob: dob,
        father_name: fath_name,
        mother_name: moth_name,
        address: {
            per_address: permanent_address,
            cur_address: current_address
        },
        results: {
            tenth_percentage: tenth_percentage,
            twelve_percentage: twelth_percentage
        },
        cpi: cpi,
        academics: {
            branch: branch,
            current_backlogs: current_backlogs,
            total_backlogs: total_backlogs
        },
        registering_for: regfor,
        domain: domain,
        phone_number: {
            main: phone,
            alt: alt_phone
        },
        // resume: !req.file ? null : req.file.url,
    })
    if (!reg_student) {
        res.status(400)
        throw new Error('Student not registered')
    }
    const tok = await generateToken(res, reg_student._id);
    res.status(201).json({
        message: "register",
        _id: reg_student._id,
        // name: reg_student.name,
        // email: reg_student.email.main
        student_id: reg_student.student_id,
        token: tok
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
        _id: studentExists._id,
        // name: studentExists.name,
        // email: studentExists.email.main,
        student_id: studentExists.student_id,
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
    // console.log(req.student);
    const stu = await student.findOne(req.student._id);
    res.status(201).json({
        stu
    })
})

//access private
//route api/student/change_password

const change_password = asyncHandler(async (req, res) => {
    // console.log(req.student);
    // console.log(req.body);
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const stu = await student.findById(req.student._id);

    let isMatch = false;
    if (stu) {
        isMatch = await bcrypt.compare(currentPassword, stu.password);
    }
    if (!stu || !isMatch) {
        res.status(400)
        throw new Error('Enter valid current password')
    }
    if (newPassword !== confirmPassword) {
        res.status(400)
        throw new Error('New password and confirm password do not match')
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    let check = await bcrypt.compare(newPassword, stu.password);
    if (check) {
        res.status(400)
        throw new Error('New password cannot be same as current password')
    }
    const updatedStudent = await student.findByIdAndUpdate(req.student._id, { password: hashedPassword }, { new: true });
    res.status(201).json({
        message: "password changed",
        updatedStudent
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

//route api/student/reject

const reject = asyncHandler(async (req, res) => {
    const { student_id } = req.body;
    const studentExist = await student.findOne({
        student_id: student_id
    });
    if (!studentExist) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const response = await student.findByIdAndDelete(studentExist._id);
    res.status(201).json({
        message: "rejected",
        response
    })
})

//route api/student/verify

const verify = asyncHandler(async (req, res) => {
    const { student_id } = req.body;
    console.log(req.body);
    const studentExist = await student.findOne({
        student_id: student_id
    });
    if (!studentExist) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const response = await student.findByIdAndUpdate(studentExist._id, { verified: true }, { new: true });
    res.status(201).json({
        message: "verified",
        response
    })
})

const getregstudent = asyncHandler(async (req, res) => {
    const regstudent = await student.find({ verified: true })
    res.status(201).json({
        regstudent
    })
})

const getpenstudent = asyncHandler(async (req, res) => {
    const penstudent = await student.find({ verified: false })
    res.status(201).json({
        penstudent
    })
})

const get_all_job_profiles = asyncHandler(async (req, res) => {
    const job = await jobprofile.find({});
    res.status(201).json({
        job
    })

})

const getStudentById = asyncHandler(async (req, res) => {
    const studentExist = await student.findById(req.params.id);
    if (!studentExist) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    res.status(201).json({
        studentExist
    })
})

module.exports = {
    auth_student,
    register_student,
    log_out_student,
    login_student,
    get_student_profile,
    update_student_profile,
    get_all_job_profiles,
    change_password,
    reject,
    verify,
    getregstudent,
    getpenstudent,
    getStudentById
};