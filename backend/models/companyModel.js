const mongoose = require("mongoose");


const company_schema = new mongoose.Schema({
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
            main: {
                type: String,
                required: [true, "Please enter a password"],
            },
            alt: {
                type: String,
                required: [true, "Please enter a alt password"],
            }
        }
    },
    wewbsite: {
        type: String,
        required: [true, "Please enter a website"],
    },
});

module.exports = mongoose.model("company", company_schema);