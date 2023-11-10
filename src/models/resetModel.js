const mongoose = require("mongoose");
const Student = require('./studentModel')

const EXPIRATION_TIME = 60 * 60;

const ResetSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: [true, "Code is required"],
        maxlength: 255,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Student",
        // unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: EXPIRATION_TIME,
    },
});

// const ResetModel =
//     mongoose.models["Reset"] ?? mongoose.model("Reset", ResetSchema);

// module.exports = ResetModel;
module.exports = mongoose.model("Reset", ResetSchema);