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
        // Include the _id in the response
        res.status(201).json(announcement);
    } else {
        res.status(400).json({ message: 'Invalid announcement data' });
    }
});


// @desc    Get all announcements for a company
// @route   GET /api/announcements
// @access  Private
const getAllAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find();

    if (announcements) {
        res.status(200).json(announcements);
    } else {
        res.status(404).json({ message: 'Announcements not found' });
    }
});


// @desc    Get an announcement by ID
// @route   GET /api/announcements/:id
// @access  Private
const getAnnouncementById = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
        res.status(200).json(announcement);
    } else {
        res.status(404).json({ message: 'Announcement not found' });
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
        await announcement.deleteOne();
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
