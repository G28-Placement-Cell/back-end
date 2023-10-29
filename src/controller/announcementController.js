const asyncHandler = require('express-async-handler');
const Announcement = require('../models/announcementModel');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/resUtils');

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private
const createAnnouncement = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        date,
        file,
        sent_to,
        is_company_announcement,
        company,
        job_profile,
    } = req.body;

    const announcement = await Announcement.create({
        title,
        description,
        date,
        file,
        sent_to,
        is_company_announcement,
        company,
        job_profile,
    });

    if (announcement) {
        sendSuccessResponse(res, 201, announcement);
    } else {
        sendErrorResponse(res, 400, 'Invalid user data');
    }
});

// @desc    Get all announcements for a company
// @route   GET /api/announcements
// @access  Private
const getAllAnnouncements = asyncHandler(async (req, res) => {
    const company = req.company._id;

    const announcements = await Announcement.find({ company });

    if (announcements) {
        sendSuccessResponse(res, 200, announcements);
    } else {
        sendErrorResponse(res, 404, 'No announcements found');
    }
});

// @desc    Get an announcement by ID
// @route   GET /api/announcements/:id
// @access  Private
const getAnnouncementById = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
        sendSuccessResponse(res, 200, announcement);
    } else {
        sendErrorResponse(res, 404, 'Announcement not found');
    }
});

// @desc    Update an announcement by ID
// @route   PUT /api/announcements/:id
// @access  Private
const updateAnnouncement = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        date,
        file,
        sent_to,
        is_company_announcement,
        company,
        job_profile,
    } = req.body;
    const announcementId = req.params.id;

    const announcement = await Announcement.findById(announcementId);

    if (announcement) {
        announcement.title = title;
        announcement.description = description;
        announcement.date = date;
        announcement.file = file;
        announcement.sent_to = sent_to;
        announcement.is_company_announcement = is_company_announcement;
        announcement.company = company;
        announcement.job_profile = job_profile;

        const updatedAnnouncement = await announcement.save();
        sendSuccessResponse(res, 200, updatedAnnouncement);
    } else {
        sendErrorResponse(res, 404, 'Announcement not found');
    }
});

// @desc    Delete an announcement by ID
// @route   DELETE /api/announcements/:id
// @access  Private
const deleteAnnouncement = asyncHandler(async (req, res) => {
    const announcementId = req.params.id;

    const announcement = await Announcement.findById(announcementId);

    if (announcement) {
        await announcement.remove();
        sendSuccessResponse(res, 200, { message: 'Announcement deleted' });
    } else {
        sendErrorResponse(res, 404, 'Announcement not found');
    }
});

module.exports = {
    createAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
};
