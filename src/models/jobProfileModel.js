const mongoose = require("mongoose");

const jobProfileSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please enter a company id"],
    },
    company_name: {
        type: String,
        required: [true, "Please enter a company id"],
    },
    offer_type: {
        type: String,
        required: [true, "Please enter a offer type"],
    },
    location: {
        type: String,
        required: [true, "Please enter a location"],
    },
    open_for: {
        type: String,
        required: [true, "Please enter a open for"],
    },
    cpi_criteria: {
        type: Number,
        required: [true, "Please enter a cpi criteria"],
    },
    ctc: {
        type: String,
        required: [true, "Please enter a ctc"],
    },
    registration_start_date: {
        type: Date,
        required: [true, "Please enter a registration start date"],
    },
    registration_end_date: {
        type: Date,
        required: [true, "Please enter a registration end date"],
    },
    job_description: {
        type: String,
        required: [true, "Please enter a job description"],
    },
    job_description_file: {
        type: String,
        required: [true, "Please enter a job description file"],
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    selected: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
});

module.exports = mongoose.model("jobProfile", jobProfileSchema);