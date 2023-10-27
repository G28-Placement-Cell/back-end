const asyncHandler = require('express-async-handler')
const Company = require('../models/companyModel')
const JobProfile = require('../models/jobProfileModel')
const Student = require('../models/studentModel')
const Announcement = require('../models/announcementModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generatejwt')

//access public
//route api/company/auth

const auth_company = asyncHandler(async (req, res) => {
    res.status(404)
    throw new Error('Not found')
    res.status(201).json({
        message: "auth"
    })
})


//access public
//route api/company/register

const register_company = asyncHandler(async (req, res) => {
    const { name, hr_name, contact_number, address, email, password, website } = req.body;
    // console.log("ok");
    // const { email, alt_email } = req.body;
    // console.log(req.body);

    const companyExists = await Company.findOne({
        email: email
    });
    // console.log(email, alt_email);
    if (companyExists) {
        res.status(400)
        throw new Error('Company already exists')
    }

    // console.log(test);
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const reg_company = await Company.create({
        name: name,
        hr_name: hr_name,
        contact_number: contact_number,
        address: address,
        email: email,
        password: password,
        website: website
    });
    if (reg_company) {
        res.status(201).json({
            _id: reg_company._id,
            name: reg_company.name,
            hr_name: reg_company.hr_name,
            contact_number: reg_company.contact_number,
            address: reg_company.address,
            email: reg_company.email,
            password: reg_company.password,
            website: reg_company.website,
            token: generateToken(reg_company._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access public
//route api/company/login

const login_company = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    const companyExists = await Company.findOne({
        email: email
    });
    // console.log(companyExists);
    // console.log(companyExists.password);
    if (companyExists && (await bcrypt.compare(password, companyExists.password))) {
        res.json({
            _id: companyExists._id,
            name: companyExists.name,
            hr_name: companyExists.hr_name,
            contact_number: companyExists.contact_number,
            address: companyExists.address,
            email: companyExists.email,
            password: companyExists.password,
            website: companyExists.website,
            token: generateToken(companyExists._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//access private
//route api/company/profile

const get_company_profile = asyncHandler(async (req, res) => {
    // const stu=await student.findOne(req._id);
    const company = {
        name: req.company.name,
        email: req.company.email
    }
    res.status(201).json({
        company
    })
})

//access private
//route api/company/logout

const log_out_company = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(201).json({
        message: "logged out"
    })
})

//access private
//route api/company/addjobprofile

const add_job_profile = asyncHandler(async (req, res) => {
    const { name, description, salary, bond, location } = req.body;
    // console.log(req.body);
    const job_profile = await JobProfile.create({
        name: name,
        description: description,
        salary: salary,
        bond: bond,
        location: location,
        company: req.company._id
    });
    if (job_profile) {
        res.status(201).json({
            _id: job_profile._id,
            name: job_profile.name,
            description: job_profile.description,
            salary: job_profile.salary,
            bond: job_profile.bond,
            location: job_profile.location,
            company: job_profile.company,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile

const view_job_profile = asyncHandler(async (req, res) => {
    const job_profile = await JobProfile.find({
        company: req.company._id
    });
    if (job_profile) {
        res.status(201).json({
            job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile/:id

const view_job_profile_by_id = asyncHandler(async (req, res) => {
    const job_profile = await JobProfile.findById(req.params.id);
    if (job_profile) {
        res.status(201).json({
            job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile/:id

const delete_job_profile_by_id = asyncHandler(async (req, res) => {
    const job_profile = await JobProfile.findById(req.params.id);
    if (job_profile) {
        await job_profile.remove();
        res.status(201).json({
            message: "deleted"
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile/:id

const update_job_profile_by_id = asyncHandler(async (req, res) => {
    const { name, description, salary, bond, location } = req.body;
    const job_profile = await JobProfile.findById(req.params.id);
    if (job_profile) {
        job_profile.name = name;
        job_profile.description = description;
        job_profile.salary = salary;
        job_profile.bond = bond;
        job_profile.location = location;
        const updated_job_profile = await job_profile.save();
        res.status(201).json({
            updated_job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile/:id

const apply_job_profile_by_id = asyncHandler(async (req, res) => {
    const job_profile = await JobProfile.findById(req.params.id);
    if (job_profile) {
        job_profile.applicants.push(req.student._id);
        const updated_job_profile = await job_profile.save();
        res.status(201).json({
            updated_job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile/:id

const view_applicants_by_id = asyncHandler(async (req, res) => {
    const job_profile = await JobProfile.findById(req.params.id).populate('applicants');
    if (job_profile) {
        res.status(201).json({
            job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/viewjobprofile/:id

const announce_result_by_id = asyncHandler(async (req, res) => {
    const { name, description, salary, bond, location } = req.body;
    const job_profile = await JobProfile.findById(req.params.id);
    if (job_profile) {
        job_profile.name = name;
        job_profile.description = description;
        job_profile.salary = salary;
        job_profile.bond = bond;
        job_profile.location = location;
        const updated_job_profile = await job_profile.save();
        res.status(201).json({
            updated_job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// add announcement
//access private
//route api/company/announcement

const add_announcement = asyncHandler(async (req, res) => {
    const { title, description, date, file, sent_to, is_company_announcement, company, job_profile } = req.body;
    // console.log(req.body);
    const announcement = await Announcement.create({
        title: title,
        description: description,
        date: date,
        file: file,
        sent_to: sent_to,
        is_company_announcement: is_company_announcement,
        company: company,
        job_profile: job_profile
    });
    if (announcement) {
        res.status(201).json({
            _id: announcement._id,
            title: announcement.title,
            description: announcement.description,
            date: announcement.date,
            file: announcement.file,
            sent_to: announcement.sent_to,
            is_company_announcement: announcement.is_company_announcement,
            company: announcement.company,
            job_profile: announcement.job_profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/announcement

const view_announcement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.find({
        company: req.company._id
    });
    if (announcement) {
        res.status(201).json({
            announcement
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/announcement/:id

const view_announcement_by_id = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
        res.status(201).json({
            announcement
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/announcement/:id

const delete_announcement_by_id = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
        await announcement.remove();
        res.status(201).json({
            message: "deleted"
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private
//route api/company/announcement/:id

const update_announcement_by_id = asyncHandler(async (req, res) => {
    const { title, description, date, file, sent_to, is_company_announcement, company, job_profile } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
        announcement.title = title;
        announcement.description = description;
        announcement.date = date;
        announcement.file = file;
        announcement.sent_to = sent_to;
        announcement.is_company_announcement = is_company_announcement;
        announcement.company = company;
        announcement.job_profile = job_profile;
        const updated_announcement = await announcement.save();
        res.status(201).json({
            updated_announcement
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//access private    
//route api/company/announcement/:id

const view_students_by_job_profile_id = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id).populate('job_profile');
    if (announcement) {
        res.status(201).json({
            announcement
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

module.exports = {
    auth_company,
    register_company,
    login_company,
    get_company_profile,
    log_out_company,
    add_job_profile,
    view_job_profile,
    view_job_profile_by_id,
    delete_job_profile_by_id,
    update_job_profile_by_id,
    apply_job_profile_by_id,
    view_applicants_by_id,
    announce_result_by_id,
    add_announcement,
    view_announcement,
    view_announcement_by_id,
    delete_announcement_by_id,
    update_announcement_by_id,
    view_students_by_job_profile_id
}