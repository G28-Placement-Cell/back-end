const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "Please enter a name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter a main email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    }
}, {
    timestamp: true
})

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model("Admin", adminSchema);