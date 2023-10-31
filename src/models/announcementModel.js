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
    },
    file: {
        type: String,
        required: true,
    },
    sent_to:[
        {
            type: String,
            required: true,
        }
    ],
    is_company_announcement: {
        type: Boolean,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
});

module.exports = mongoose.model("Announcement", announcementSchema);