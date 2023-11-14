const Student = require("../models/studentModel");
const Reset = require("../models/resetModel");
const { NotFoundError, ForbiddenError } = require("../errors");
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

{/* <a href="https://front-end-main-three.vercel.app/password-reset/${reset._id}">Click Here</a> */ }

async function registerMail({ student_id, company_name }) {
    try {
        console.log(student_id);
        const user = await Student.findOne({ student_id: student_id });
        const email = user.email.main;
        console.log(email)
        if (!user) throw new NotFoundError("User not found");
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "Registration Successful in " + company_name,
            html: `<p>Registration Successfull in ${company_name} company.</b>
            Thank you for registering.</p>`,
        });
        return;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

async function deregisterMail({ student_id, company_name }) {
    try {
        console.log(student_id);
        const user = await Student.findOne({ student_id: student_id });
        const email = user.email.main;
        console.log(email)
        if (!user) throw new NotFoundError("User not found");
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "DeRegistration Successful in " + company_name,
            html: `<p>DeRegistration Successfull in ${company_name} company.</b>
            Do register again if you wish to.
            </p>
            `,
        });
        return;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

module.exports = {
    registerMail,
    deregisterMail
};