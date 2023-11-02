const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    surname: {
        type: String,
        required: [true, "Please enter a surname"],
    },
    student_id: {
        type: String,
        required: [true, "Please enter a student id"],
        unique: true,
    },
    email: {
        type: {
            main: {
                type: String,
                required: [true, "Please enter a main email"],
                unique: true,
            },
            alt: {
                type: String,
                required: [true, "Please enter a alt email"],
                unique: true,
            }
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    skype_id: {
        type: String,
        required: [true, "Please enter a skype id"],
    },
    phone_number: {
        type: {
            main: {
                type: Number,
                required: [true, "Please enter a phone number"],
            },
            alt: {
                type: Number,
                required: [true, "Please enter a alt phone number"],
            }
        }
    },
    gender: {
        type: String,
        required: [true],
    },
    dob: {
        type: Date,
        required: [true, "Please enter a date of birth"],
    },
    father_name: {
        type: String,
        required: [true, "Please enter a father name"],
    },
    mother_name: {
        type: String,
        required: [true, "Please enter a mother name"],
    },
    address: {
        type: {
            per_address: {
                type: String,
                required: [true, "Please enter a permanent address"],
            },
            cur_address: {
                type: String,
                required: [true, "Please enter a current address"],
            },
        }
    },
    results: {
        type: {
            tenth_percentage: {
                type: Number,
                required: [true, "Please enter a 10th percentage"],
            },
            twelve_percentage: {
                type: Number,
                required: [true, "Please enter a 12th percentage"],
            },
        },
        required: [true, "Please enter results"],
    },
    cpi: {
        type: Number,
        required: [true, "Please enter a CPI"],
    },
    academics: {
        type: {
            branch: {
                type: String,
                required: [true, "Please enter a branch"],
            },
            current_backlogs: {
                type: Number,
                required: [true, "Please enter a current backlogs"],
            },
            total_backlogs: {
                type: Number,
                required: [true, "Please enter a total backlogs"],
            },
        }
    },
    resume: {
        type: String,
        
        // required: [true, "Please upload a resume"],
    },
    profile_pic: {
        type: String,
        // required: [true, "Please upload a profile pic"],
    },
    in_drive: {
        type: Boolean,
        // required: [true, "Please enter a interested in"],
    },
    registering_for: {
        type: String,
        required: [true, "Please select a registering for"],
    },
    domain: {
        type: String,
        // required: [true, "Please select a domain"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    jobprofiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobProfile'
        }
    ],
    shorlisted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobProfile'
        }
    ],
}, {
    timestamp: true
})

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model("Student", studentSchema);