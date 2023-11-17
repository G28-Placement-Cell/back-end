const Student = require("../models/studentModel");
const Company = require("../models/companyModel");
const Admin = require("../models/adminModel");
const Reset = require("../models/resetModel");
const { NotFoundError, UnauthorizedError, ForbiddenError } = require("../errors");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
    },
});


const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
{/* <a href="https://front-end-main-three.vercel.app/password-reset/${reset._id}">Click Here</a> */ }

async function createReset({ student_id }) {
    try {
        console.log(student_id);
        const user = await Student.findOne({ student_id: student_id });
        const email = user.email.main;
        console.log(email)
        if (!user) throw new NotFoundError("User not found");
        const otp = generateOTP();
        console.log(user._id);
        const reset = await Reset.create({ userId: user._id, otp: otp });
        console.log(reset);
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "Placement Password Reset",
            html: `<p>Use this OTP to reset your password: <b>${otp}</b></p>
        <p>This OTP will expire in 1 hour</p>
        <p>Password Reset Link: <a href="https://placement-cell-student.vercel.app/resetpassword">Reset</a></p>`,
        });
        return reset;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

async function createResetCompany({ email }) {
    try {
        const user = await Company.findOne({ email: email });
        console.log(email)
        console.log(user);
        if (!user) throw new NotFoundError("User not found");
        const otp = generateOTP();
        console.log(user._id);
        const reset = await Reset.create({ userId: user._id, otp: otp });
        console.log(reset);
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "Placement Password Reset",
            html: `<p>Use this OTP to reset your password: <b>${otp}</b></p>
        <p>This OTP will expire in 1 hour</p>
        <p>Password Reset Link: <a href="https://placement-cell-compnay.vercel.app/resetpassword">Reset</a></p>`,
        });
        return reset;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

async function createResetAdmin({ email }) {
    try {
        const user = await Admin.findOne({ email: email });
        console.log(email)
        console.log(user);
        if (!user) throw new NotFoundError("User not found");
        const otp = generateOTP();
        console.log(user._id);
        const reset = await Reset.create({ userId: user._id, otp: otp });
        console.log(reset);
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "Placement Password Reset",
            html: `<p>Use this OTP to reset your password: <b>${otp}</b></p>
        <p>This OTP will expire in 1 hour</p>
        <p>Password Reset Link: <a href="https://placement-cell-admin.vercel.app/resetpassword">Reset</a></p>`,
        });
        return reset;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

async function applyResetCompany({ otp, resetId, password }) {
    const reset = await Reset.findById(resetId).exec();
    if (!reset) throw new NotFoundError("Reset expired");
    if (reset.otp !== otp) throw new UnauthorizedError("Invalid OTP");
    password = await bcrypt.hash(password, 10);
    // console.log(reset);
    const user = await Company.findByIdAndUpdate(reset.userId, {
        password,
    });
    if (!user) throw new NotFoundError("User not found");
    await Reset.findByIdAndDelete(resetId);
    return user;
}

async function applyResetAdmin({ otp, resetId, password }) {
    const reset = await Reset.findById(resetId).exec();
    if (!reset) throw new NotFoundError("Reset expired");
    if (reset.otp !== otp) throw new UnauthorizedError("Invalid OTP");
    password = await bcrypt.hash(password, 10);
    // console.log(reset);
    const user = await Admin.findByIdAndUpdate(reset.userId, {
        password,
    });
    if (!user) throw new NotFoundError("User not found");
    await Reset.findByIdAndDelete(resetId);
    return user;
}

async function applyReset({ otp, resetId, password }) {
    const reset = await Reset.findById(resetId).exec();
    if (!reset) throw new NotFoundError("Reset expired");
    if (reset.otp !== otp) throw new UnauthorizedError("Invalid OTP");
    password = await bcrypt.hash(password, 10);
    // console.log(reset);
    const user = await Student.findByIdAndUpdate(reset.userId, {
        password,
    });
    if (!user) throw new NotFoundError("User not found");
    await Reset.findByIdAndDelete(resetId);
    return user;
}

module.exports = {
    createReset,
    applyReset,
    createResetCompany,
    applyResetCompany,
    createResetAdmin,
    applyResetAdmin,
};