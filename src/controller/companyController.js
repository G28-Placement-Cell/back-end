const asyncHandler = require('express-async-handler')
const Company = require('../models/companyModel')
const JobProfile = require('../models/jobProfileModel')
const Student = require('../models/studentModel')
const Announcement = require('../models/announcementModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generatejwt')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/resUtils')

//access public
//route api/company/auth

const authCompany = asyncHandler(async (req, res) => {
    res.status(404)
    throw new Error('Not found')
    res.status(201).json({
        message: "auth"
    })
    
})

const getCompanyProfile = asyncHandler(async (req, res) => {
    // console.log(req.student);
    const comp = await Company.findOne(req.company._id);
    res.status(201).json({
        comp
    })
})

// module.exports = getCompanyProfile;


//access private
//route api/company/logout

const logOutCompany = (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            expires: new Date(0),
        });

        return sendSuccessResponse(res, 201, { message: 'Logged out' });
    } catch (error) {
        return sendErrorResponse(res, 500, 'Server Error');
    }
};

const getCompanyName = asyncHandler(async (req, res) => {
    try {
        // if (!req.company || !req.company._id) {
        //     // If req.company is not defined or doesn't have an _id property
        //     return res.status(400).json({ message: 'Company information not found' });
        // }

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//access public
//route api/company/register

const registerCompany = async (req, res) => {
    const { companyname, hrname, contact, address, email, password, website } = req.body;
    console.log(req.body);
    try {
        const companyExists = await Company.findOne({ email });

        if (companyExists) {
            return sendErrorResponse(res, 400, 'Company already exists');
        }

        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        const reg_company = await Company.create({
            companyname,
            hrname,
            contact,
            address,
            email,
            password,
            website
        });

        if (reg_company) {
            const tok = await generateToken(reg_company._id);
            console.log(tok);
            res.status(201).json({
                _id: reg_company._id,
                companyname: reg_company.companyname,
                hrname: reg_company.hrname,
                token: tok,
            });
        } else {
            res.status(400).json({
                message: "Invalid user data"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

//access public
//route api/company/login

const loginCompany = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const companyExists = await Company.findOne({ email });

    let isMatch = false;
    if (companyExists) {
        isMatch = await bcrypt.compare(password, companyExists.password);
    }

    if (!companyExists || !isMatch) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    const tok = await generateToken(res, companyExists._id);
    console.log(tok);
    console.log("hurray");
    res.status(201).json({
        message: "Login",
        // You can include additional data here if needed
        _id: companyExists._id,
        email: companyExists.email,
        token: tok,
    });
});


const change_password = asyncHandler(async (req, res) => {
    // console.log(req.admin);
    console.log(req.body);
    console.log(req.company)
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const cmp = await Company.findById(req.company._id);

    let isMatch = false;
    if (cmp) {
        isMatch = await bcrypt.compare(currentPassword, cmp.password);
    }
    if (!cmp || !isMatch) {
        res.status(400)
        throw new Error('Enter valid current password')
    }
    if (newPassword !== confirmPassword) {
        res.status(400)
        throw new Error('New password and confirm password do not match')
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    let check = await bcrypt.compare(newPassword, cmp.password);
    if (check) {
        res.status(400)
        throw new Error('New password cannot be same as current password')
    }
    const updatedadmin = await Company.findByIdAndUpdate(req.company._id, { password: hashedPassword }, { new: true });
    res.status(201).json({
        message: "password changed",
        updatedadmin
    })

})

const verify = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const companyExist = await Company.findOne({ email });

    if (!companyExist) {
        res.status(404).json({
            error: 'Company does not exist',
        });
        return;
    }

    const response = await Company.findByIdAndUpdate(companyExist._id, { isVerified: true });

    res.status(200).json({
        message: 'Company verified',
        response,
    });
});


const reject = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const companyExist = await Company.findOne({
        email: email
    });
    if (!companyExist) {
        res.status(400)
        throw new Error('Company does not exist')
    }
    const response = await Company.findByIdAndDelete(companyExist._id);
    res.status(201).json({
        message: "rejected",
        response
    })
})

const getregcompany = asyncHandler(async (req, res) => {
    const company = await Company.find({ isVerified: true });
    res.status(201).json({
        company
    })
})

const getpencompany = asyncHandler(async (req, res) => {
    const company = await Company.find({ isVerified: false });
    res.status(201).json({
        company
    })
})

module.exports = {
    authCompany,
    registerCompany,
    loginCompany,
    verify,
    reject,
    getregcompany,
    getpencompany,
    change_password,
    getCompanyName,
    getCompanyProfile,
    logOutCompany
};