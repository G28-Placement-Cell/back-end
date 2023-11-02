const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Please enter a name"],
    },
    hrname: {
        type: String,
        required: [true, "Please enter a hr name"],
    },
    contact: {
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
        type: String,
        required: [true, "Please enter a password"],
    },
    website: {
        type: String,
        required: [true, "Please enter a website"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    jobprofiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobProfile'
        }
    ],
});

companySchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Company", companySchema);