const asyncHandler = require('express-async-handler');
const JobProfile = require('../models/jobProfileModel');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/resUtils');

// @desc    Create a new job profile
// @route   POST /api/jobProfiles
// @access  Private
const createJobProfile = asyncHandler(async (req, res) => {
    const { name, description, salary, bond, location } = req.body;
    const company = req.company._id;

    const jobProfile = await JobProfile.create({
        name,
        description,
        salary,
        bond,
        location,
        company,
    });

    if (jobProfile) {
        sendSuccessResponse(res, 201, jobProfile);
    } else {
        sendErrorResponse(res, 400, 'Invalid user data');
    }
});

// @desc    Get all job profiles for a company
// @route   GET /api/jobProfiles
// @access  Private
const getAllJobProfiles = asyncHandler(async (req, res) => {
    const company = req.company._id;

    const jobProfiles = await JobProfile.find({ company });

    if (jobProfiles) {
        sendSuccessResponse(res, 200, jobProfiles);
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
        sendSuccessResponse(res, 200, jobProfile);
    } else {
        sendErrorResponse(res, 404, 'Job profile not found');
    }
});

// @desc    Update a job profile by ID
// @route   PUT /api/jobProfiles/:id
// @access  Private
const updateJobProfile = asyncHandler(async (req, res) => {
    const { name, description, salary, bond, location } = req.body;
    const jobProfileId = req.params.id;

    const jobProfile = await JobProfile.findById(jobProfileId);

    if (jobProfile) {
        jobProfile.name = name;
        jobProfile.description = description;
        jobProfile.salary = salary;
        jobProfile.bond = bond;
        jobProfile.location = location;

        const updatedJobProfile = await jobProfile.save();
        sendSuccessResponse(res, 200, updatedJobProfile);
    } else {
        sendErrorResponse(res, 404, 'Job profile not found');
    }
});

// @desc    Delete a job profile by ID
// @route   DELETE /api/jobProfiles/:id
// @access  Private
const deleteJobProfile = asyncHandler(async (req, res) => {
    const jobProfileId = req.params.id;

    const jobProfile = await JobProfile.findById(jobProfileId);

    if (jobProfile) {
        await jobProfile.remove();
        sendSuccessResponse(res, 200, { message: 'Job profile deleted' });
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
};