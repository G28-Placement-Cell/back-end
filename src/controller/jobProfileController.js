const asyncHandler = require('express-async-handler');
const JobProfile = require('../models/jobProfileModel');
const Student = require('../models/studentModel');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/resUtils');

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
            cpi_criteria,
            ctc,
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
            cpi_criteria,
            ctc,
            registration_start_date,
            registration_end_date,
            job_description,
            job_description_file,
        });

        const createdJobProfile = await jobProfile.save();
        res.status(201).json(createdJobProfile);
    } catch (error) {
        // console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' }); // You can customize the error message and status code
    }
});





// @desc    Get all job profiles for a company
// @route   GET /api/jobProfiles
// @access  Private
const getAllJobProfiles = asyncHandler(async (req, res) => {
    // const company = req.body.company;

    const jobProfiles = await JobProfile.find({});

    if (jobProfiles.length > 0) {
        sendSuccessResponse(res, 200, {jobProfiles});
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

    const jobProfile = await JobProfile.findById(jobProfileId);

    if (jobProfile) {
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

        const updatedJobProfile = await jobProfile.save();
        res.status(200).json(updatedJobProfile);
    } else {
        res.status(404).json({ message: 'Job profile not found' });
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
    jobprofileExists.applicants.push(student_id);
    studentExists.jobprofiles.push(jobprofile_id);
    const updatedJobProfile = await jobprofileExists.save();
    const updatedStudent = await studentExists.save();
    res.status(201).json({
        message: "registered",
        updatedJobProfile,
        updatedStudent
    })
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
    res.status(201).json({
        message: "deregistered",
        updatedJobProfile,
        updatedStudent
    })
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

module.exports = {
    createJobProfile,
    getAllJobProfiles,
    getJobProfileById,
    updateJobProfile,
    deleteJobProfile,
    registerToJobprofile,
    deregisterFromJobprofile,
    addToShortlisted,
    removeFromShortlisted
};