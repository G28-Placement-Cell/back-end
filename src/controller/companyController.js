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



//access private
//route api/company/profile

// const Company = require('../models/companyModel'); // Import your Company model

const getCompanyProfile = async (req, res) => {
    try {
        const comp = await Company.findById(req.company._id);
        res.status(200).json({
            comp
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
        });
    }
};

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

//access private
//route api/company/addjobprofile

// const addJobProfile = async (req, res) => {
//     try {
//         const { name, description, salary, bond, location } = req.body;
//         const jobProfile = await JobProfile.create({
//             name,
//             description,
//             salary,
//             bond,
//             location,
//             company: req.company._id,
//         });

//         if (jobProfile) {
//             return sendSuccessResponse(res, 201, jobProfile);
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private
// //route api/company/viewjobprofile

// const viewJobProfile = async (req, res) => {
//     try {
//         const jobProfile = await JobProfile.find({ company: req.company._id });
//         if (jobProfile) {
//             return sendSuccessResponse(res, 200, { job_profile: jobProfile });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };


// //access private
// //route api/company/viewjobprofile/:id

// const viewJobProfileById = async (req, res) => {
//     try {
//         const jobProfile = await JobProfile.findById(req.params.id);
//         if (jobProfile) {
//             return sendSuccessResponse(res, 200, { job_profile: jobProfile });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private
// //route api/company/viewjobprofile/:id

// const deleteJobProfileById = async (req, res) => {
//     try {
//         const jobProfile = await JobProfile.findById(req.params.id);
//         if (jobProfile) {
//             await jobProfile.remove();
//             return sendSuccessResponse(res, 200, { message: 'Job profile deleted' });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private
// //route api/company/viewjobprofile/:id

// const updateJobProfileById = async (req, res) => {
//     try {
//         const { name, description, salary, bond, location } = req.body;
//         const jobProfile = await JobProfile.findById(req.params.id);

//         if (jobProfile) {
//             jobProfile.name = name;
//             jobProfile.description = description;
//             jobProfile.salary = salary;
//             jobProfile.bond = bond;
//             jobProfile.location = location;

//             const updatedJobProfile = await jobProfile.save();
//             return sendSuccessResponse(res, 201, { updatedJobProfile });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };


// //access private
// //route api/company/viewjobprofile/:id

// const applyJobProfileById = async (req, res) => {
//     try {
//         const jobProfile = await JobProfile.findById(req.params.id);

//         if (jobProfile) {
//             jobProfile.applicants.push(req.student._id);
//             const updatedJobProfile = await jobProfile.save();
//             return sendSuccessResponse(res, 201, { updatedJobProfile });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };


// //access private
// //route api/company/viewjobprofile/:id

// const viewApplicantsById = async (req, res) => {
//     try {
//         const jobProfile = await JobProfile.findById(req.params.id).populate('applicants');
//         if (jobProfile) {
//             return sendSuccessResponse(res, 200, { jobProfile });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };


// // add announcement
// //access private
// //route api/company/announcement

// const addAnnouncement = async (req, res) => {
//     try {
//         const { title, description, date, file, sent_to, is_company_announcement, company, job_profile } = req.body;

//         const announcement = await Announcement.create({
//             title, description, date, file, sent_to, is_company_announcement, company, job_profile
//         });

//         if (announcement) {
//             return sendSuccessResponse(res, 201, {
//                 _id: announcement._id,
//                 title: announcement.title,
//                 description: announcement.description,
//                 date: announcement.date,
//                 file: announcement.file,
//                 sent_to: announcement.sent_to,
//                 is_company_announcement: announcement.is_company_announcement,
//                 company: announcement.company,
//                 job_profile: announcement.job_profile
//             });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };
// //access private
// //route api/company/announcement

// const viewAnnouncement = async (req, res) => {
//     try {
//         const announcements = await Announcement.find({ company: req.company._id });

//         if (announcements) {
//             return sendSuccessResponse(res, 200, { announcements });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private
// //route api/company/announcement/:id

// const viewAnnouncementById = async (req, res) => {
//     try {
//         const announcement = await Announcement.findById(req.params.id);

//         if (announcement) {
//             return sendSuccessResponse(res, 201, { announcement });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private
// //route api/company/announcement/:id

// const deleteAnnouncementById = async (req, res) => {
//     try {
//         const announcement = await Announcement.findById(req.params.id);

//         if (announcement) {
//             await announcement.remove();
//             return sendSuccessResponse(res, 201, { message: 'Deleted' });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private
// //route api/company/announcement/:id

// const updateAnnouncementById = async (req, res) => {
//     const { title, description, date, file, sent_to, is_company_announcement, company, job_profile } = req.body;
//     const announcementId = req.params.id;

//     try {
//         const announcement = await Announcement.findById(announcementId);

//         if (announcement) {
//             announcement.title = title;
//             announcement.description = description;
//             announcement.date = date;
//             announcement.file = file;
//             announcement.sent_to = sent_to;
//             announcement.is_company_announcement = is_company_announcement;
//             announcement.company = company;
//             announcement.job_profile = job_profile;

//             const updatedAnnouncement = await announcement.save();

//             return sendSuccessResponse(res, 201, { updatedAnnouncement });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

// //access private    
// //route api/company/announcement/:id

// const viewStudentsByJobProfileId = async (req, res) => {
//     try {
//         const announcement = await Announcement.findById(req.params.id).populate('job_profile');

//         if (announcement) {
//             return sendSuccessResponse(res, 201, { announcement });
//         } else {
//             return sendErrorResponse(res, 400, 'Invalid user data');
//         }
//     } catch (error) {
//         return sendErrorResponse(res, 500, 'Server Error');
//     }
// };

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
    const { company_id } = req.body;
    const companyExist = await Company.findOne({
        company_id: company_id
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
    getCompanyProfile,
    logOutCompany,
    // addJobProfile,
    // viewJobProfile,
    // viewJobProfileById,
    // deleteJobProfileById,
    // updateJobProfileById,
    // applyJobProfileById,
    // viewApplicantsById,
    // // announceResultById,
    // addAnnouncement,
    // viewAnnouncement,
    // viewAnnouncementById,
    // deleteAnnouncementById,
    // updateAnnouncementById,
    // viewStudentsByJobProfileId
    verify,
    reject,
    getregcompany,
    getpencompany
};