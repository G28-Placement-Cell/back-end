const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    hr_name: {
        type: String,
        required: [true, "Please enter a hr name"],
    },
    contact_number: {
        type: String,
        required: [true, "Please enter a contact number"],
    },
    address: {
        type: String,
        required: [true, "Please enter a address"],
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
    },
    password: {
        type: {
            type: String,
            required: [true, "Please enter a password"],
        }
    },
    wewbsite: {
        type: String,
        required: [true, "Please enter a website"],
    },
    job_profiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobProfile'
        }
    ],
});

module.exports = mongoose.model("Company", companySchema);