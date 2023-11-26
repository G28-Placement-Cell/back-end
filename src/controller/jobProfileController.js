const asyncHandler = require('express-async-handler');
const JobProfile = require('../models/jobProfileModel');
const Student = require('../models/studentModel');
const Company = require('../models/companyModel');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/resUtils');
const { registerMail, deregisterMail, jobProfileMail } = require("../services/registerMail.service");
const ExcelJS = require('exceljs');

// @desc    Create a new job profile
// @route   POST /api/jobProfiles
// @access  Private
const createJobProfile = asyncHandler(async (req, res) => {
    try {
        const {
            company,
            company_name,
            offer_type,
            location,
            open_for,
            company_type,
            cpi_criteria,
            ctc,
            stipend,
            registration_start_date,
            registration_end_date,
            job_description,
            job_description_file,
        } = req.body;
        const jobProfile = new JobProfile({
            company,
            company_name,
            offer_type,
            location,
            open_for,
            company_type,
            cpi_criteria,
            ctc,
            stipend,
            registration_start_date,
            registration_end_date,
            job_description,
            job_description_file,
        });
        // console.log(offer_type)
        const createdJobProfile = await jobProfile.save();
        const companydetail = await Company.findById(company);
        // console.log(companydetail)
        const compname = companydetail.companyname;
        console.log(compname)
        console.log('ok')
        // offer_type = offer_type.toLowerCase();
        console.log('Created job profile:', createdJobProfile);
        const relatedStudent = await Student.find({
            verified: true,
            registering_for: offer_type.toLowerCase()
        });
        // console.log(relatedStudent)
        const student_id = [];
        for (let i = 0; i < relatedStudent.length; i++) {
            student_id.push(relatedStudent[i].email.main);
        }
        // console.log(student_id);
        if (student_id.length > 0) {
            const sendJobMail = await jobProfileMail({ compname, student_id, company_name, createdJobProfile });
        }
        // console.log(relatedStudent);
        res.status(201).json({ message: "Job profile created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});






// @desc    Get all job profiles for a company
// @route   GET /api/jobProfiles
// @access  Private
const getAllJobProfiles = asyncHandler(async (req, res) => {
    // const company = req.body.company;

    const jobProfiles = await JobProfile.find({});

    if (jobProfiles.length > 0) {
        sendSuccessResponse(res, 200, { jobProfiles });
    } else {
        sendErrorResponse(res, 404, 'No job profiles found');
    }
});


// @desc    Get a job profile by ID
// @route   GET /api/jobProfiles/:id
// @access  Private
const getJobProfileById = asyncHandler(async (req, res) => {
    const jobProfile = await JobProfile.findById(req.params.id);

    if (jobProfile) {
        res.status(200).json(jobProfile);
    } else {
        res.status(404).json({ message: 'Job profile not found' });
    }
});

// @desc    Update a job profile by ID
// @route   PUT /api/jobProfiles/:id
// @access  Private
const updateJobProfile = asyncHandler(async (req, res) => {
    const {
        company_name,
        offer_type,
        location,
        open_for,
        cpi_criteria,
        ctc,
        registration_start_date,
        registration_end_date,
        job_description,
        job_description_file,
    } = req.body;
    const jobProfileId = req.params.id;
    console.log('Received update request for job profile ID:', jobProfileId);

    try {
        // Check if the job profile exists
        const jobProfile = await JobProfile.findById(jobProfileId);

        if (jobProfile) {
            console.log('Found job profile:', jobProfile);

            // Update job profile fields
            jobProfile.company_name = company_name;
            jobProfile.offer_type = offer_type;
            jobProfile.location = location;
            jobProfile.open_for = open_for;
            jobProfile.cpi_criteria = cpi_criteria;
            jobProfile.ctc = ctc;
            jobProfile.registration_start_date = registration_start_date;
            jobProfile.registration_end_date = registration_end_date;
            jobProfile.job_description = job_description;
            jobProfile.job_description_file = job_description_file;

            // Save the updated job profile
            const updatedJobProfile = await jobProfile.save();
            console.log('Job profile updated successfully:', updatedJobProfile);

            // Send the updated job profile in the response
            res.status(200).json(updatedJobProfile);
        } else {
            console.log('Job profile not found');
            res.status(404).json({ message: 'Job profile not found' });
        }
    } catch (error) {
        console.error('Error updating job profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// @desc    Delete a job profile by ID
// @route   DELETE /api/jobProfiles/:id
// @access  Private
const deleteJobProfile = asyncHandler(async (req, res) => {
    const jobProfileId = req.params.id;

    const jobProfile = await JobProfile.findById(jobProfileId);

    if (jobProfile) {
        await jobProfile.deleteOne();
        res.status(200).json({ message: 'Job profile removed' });
    } else {
        res.status(404).json({ message: 'Job profile not found' });
    }
});

const registerToJobprofile = asyncHandler(async (req, res) => {
    const jobprofile_id = req.params.id;
    const student_id = req.params.stuId;
    const jobprofileExists = await JobProfile.findById(jobprofile_id);
    const studentExists = await Student.findById(student_id);
    if (!jobprofileExists) {
        res.status(400)
        throw new Error('Job profile does not exist')
    }
    if (!studentExists) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const check = jobprofileExists.applicants.includes(student_id);
    if (check) {
        res.status(400)
        throw new Error('Student already registered')
    }
    // console.log(jobprofileExists);
    jobprofileExists.applicants.push(student_id);
    studentExists.jobprofiles.push(jobprofile_id);
    const updatedJobProfile = await jobprofileExists.save();
    console.log(updatedJobProfile)
    const updatedStudent = await studentExists.save();
    const company_name = updatedJobProfile.company_name;
    try {
        // console.log(req.body.student_id);
        const student_id = studentExists.student_id;
        const regmail = await registerMail({ student_id, company_name });
        res.status(201).json({
            message: "Registered successfully",
        });
    } catch (error) {
        next(error);
    }
    // res.status(201).json({
    //     message: "registered",
    //     updatedJobProfile,
    //     updatedStudent
    // })
})

const deregisterFromJobprofile = asyncHandler(async (req, res) => {
    const jobprofile_id = req.params.id;
    const student_id = req.params.stuId;
    const jobprofileExists = await JobProfile.findById(jobprofile_id);
    const studentExists = await Student.findById(student_id);
    if (!jobprofileExists) {
        res.status(400)
        throw new Error('Job profile does not exist')
    }
    if (!studentExists) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const check = jobprofileExists.applicants.includes(student_id);
    if (!check) {
        res.status(400)
        throw new Error('Student not registered')
    }
    jobprofileExists.applicants.pull(student_id);
    studentExists.jobprofiles.pull(jobprofile_id);
    const updatedJobProfile = await jobprofileExists.save();
    const updatedStudent = await studentExists.save();
    const company_name = updatedJobProfile.company_name;
    try {
        // console.log(req.body.student_id);
        const student_id = studentExists.student_id;
        const regmail = await deregisterMail({ student_id, company_name });
        res.status(201).json({
            message: "Deregistered successfully",
        });
    } catch (error) {
        next(error);
    }
    // res.status(201).json({
    //     message: "deregistered",
    //     updatedJobProfile,
    //     updatedStudent
    // })
})

const addToShortlisted = asyncHandler(async (req, res) => {
    const jobprofile_id = req.params.id;
    const student_id = req.params.stuId;
    const jobprofileExists = await JobProfile.findById(jobprofile_id);
    const studentExists = await Student.findById(student_id);
    if (!jobprofileExists) {
        res.status(400)
        throw new Error('Job profile does not exist')
    }
    if (!studentExists) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const check = jobprofileExists.selected.includes(student_id);
    if (check) {
        res.status(400)
        throw new Error('Student already shortlisted')
    }
    jobprofileExists.selected.push(student_id);
    studentExists.shorlisted.push(jobprofile_id);
    const updatedJobProfile = await jobprofileExists.save();
    const updatedStudent = await studentExists.save();
    res.status(201).json({
        message: "shortlisted",
        updatedJobProfile,
        updatedStudent
    })
})

const removeFromShortlisted = asyncHandler(async (req, res) => {
    const jobprofile_id = req.params.id;
    const student_id = req.params.stuId;
    const jobprofileExists = await JobProfile.findById(jobprofile_id);
    const studentExists = await Student.findById(student_id);
    if (!jobprofileExists) {
        res.status(400)
        throw new Error('Job profile does not exist')
    }
    if (!studentExists) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const check = jobprofileExists.selected.includes(student_id);
    if (!check) {
        res.status(400)
        throw new Error('Student not shortlisted')
    }
    jobprofileExists.selected.pull(student_id);
    studentExists.shorlisted.pull(jobprofile_id);
    const updatedJobProfile = await jobprofileExists.save();
    const updatedStudent = await studentExists.save();
    res.status(201).json({
        message: "removed from shortlisted",
        updatedJobProfile,
        updatedStudent
    })
})

const getJobProfilesOfCompany = asyncHandler(async (req, res) => {
    const company = req.params.id;
    const jobProfiles = await JobProfile.find({ company: company });
    if (jobProfiles.length > 0) {
        sendSuccessResponse(res, 200, { jobProfiles });
    } else {
        sendErrorResponse(res, 404, 'No job profiles found');
    }
})

// const getRegStudentsOfJobProfile = asyncHandler(async (req, res) => {
//     const jobProfileId = req.params.id;
//     const jobProfile = await JobProfile.findById(jobProfileId);
//     if (jobProfile) {
//         const students = await Student.find({ jobprofiles: jobProfileId });
//         sendSuccessResponse(res, 200, { students });
//     } else {
//         sendErrorResponse(res, 404, 'Job profile not found');
//     }
// })



// ... Other existing code

const getRegStudentsOfJobProfile = asyncHandler(async (req, res) => {
    const jobProfileId = req.params.id;
    console.log(jobProfileId)
    const jobProfile = await JobProfile.findById(jobProfileId);
    console.log(jobProfile)
    if (jobProfile) {
        const students = await Student.find({ jobprofiles: jobProfileId });
        console.log(students)
        if (students.length > 0) {
            // Creating an Excel workbook
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Registered Students');

            // Define columns in the Excel sheet
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 20 },
                { header: 'Email', key: 'email', width: 30 },
                // Add more columns as needed to capture student details
            ];

            // Populate rows with student details
            students.forEach(student => {
                worksheet.addRow({
                    name: student.name, // Replace with actual property names
                    email: student.email.main, // Replace with actual property names
                    // Add more columns' data as needed
                });
            });

            // Generate a unique filename for the Excel sheet
            const fileName = `registered_students_${jobProfile.company_name}.xlsx`;

            // Set response headers to trigger file download in the client
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename = ${fileName}`);

            // Write the workbook data to response and send to the client
            await workbook.xlsx.write(res);
            res.end();
        } else {
            sendErrorResponse(res, 404, 'No students found for this job profile');
        }
    } else {
        sendErrorResponse(res, 404, 'Job profile not found');
    }
});

module.exports = {
    createJobProfile,
    getAllJobProfiles,
    getJobProfileById,
    updateJobProfile,
    deleteJobProfile,
    registerToJobprofile,
    deregisterFromJobprofile,
    addToShortlisted,
    removeFromShortlisted,
    getJobProfilesOfCompany,
    getRegStudentsOfJobProfile
};