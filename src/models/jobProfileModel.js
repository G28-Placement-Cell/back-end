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
    company_type: {
        type: String,
        required: [true, "Please enter a company type"],
    },
    cpi_criteria: {
        type: Number,
        required: [true, "Please enter a cpi criteria"],
    },
    ctc: {
        type: Number,
        required: [true, "Please enter a ctc"],
    },
    stipend: {
        type: Number,
        required: [true, "Please enter a stipend"],
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
        required: false
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