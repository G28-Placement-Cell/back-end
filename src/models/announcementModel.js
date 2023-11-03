const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    is_company_announcement: {
        type: Boolean,
        required: true,
    },
    for_students: {
        type: Boolean,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Announcement", announcementSchema);