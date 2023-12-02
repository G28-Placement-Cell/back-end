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


const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'UTC' };

{/* <a href="https://front-end-main-three.vercel.app/password-reset/${reset._id}">Click Here</a> */ }

async function registerMail({ compName, student_id, company_name }) {
    try {
        console.log(student_id);
        const user = await Student.findOne({ student_id: student_id });
        const email = user.email.main;
        console.log(email)
        if (!user) throw new NotFoundError("User not found");
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "Registration Successful in " + compName,
            html: `<p>Registration Successfull in <strong>${compName}</strong> company.</b>
            Thank you for registering.</p>`,
        });
        return;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

async function deregisterMail({compName, student_id, company_name }) {
    try {
        console.log(student_id);
        const user = await Student.findOne({ student_id: student_id });
        const email = user.email.main;
        console.log(email)
        if (!user) throw new NotFoundError("User not found");
        await transporter.sendMail({
            from: `${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: "DeRegistration Successful in " + compName,
            html: `<p>DeRegistration Successfull in ${compName} company.</b>
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

async function jobProfileMail({ compname, student_id, company_name, createdJobProfile }) {
    try {
        // console.log(createdJobProfile)
        // console.log(student_id);
        // console.log(company_name);
        const mailOptions = {
            from: `${process.env.NODEMAILER_EMAIL}`,
            subject: "Registration open for " + compname,
            html: `<p><strong>Dear Students,</strong></p>
            <p><strong>Upcoming placement drive of the company ${compname} is scheduled.</strong></p>
            <p><strong>Details of the drive and eligibility criteria are as follows:</strong></p>
            <ul>
                <li><strong>Job Profile :</strong> ${company_name}</li>
                <li><strong>Registration Starts on:</strong> ${createdJobProfile.registration_start_date.toLocaleDateString('en-GB', options)}</li>
                <li><strong>Registration Ends on:</strong> ${createdJobProfile.registration_end_date.toLocaleDateString('en-GB', options)}</li>
                <li><strong>Offer Type:</strong> ${createdJobProfile.offer_type}</li>
                <li><strong>CTC (in LPA):</strong> ${createdJobProfile.ctc}</li>
                <li><strong>Stipend:</strong> ${createdJobProfile.stipend}</li>
                <li><strong>Open for:</strong> ${createdJobProfile.open_for}</li>
                <li><strong>Posting location:</strong> ${createdJobProfile.location}</li>
            </ul>
            <p><strong>Please Do Not Respond back to this E-mail as this is Auto Generated E-mail, contact us at <a href="mailto:g28.placement@gmail.com">g28.placement@gmail.com</a> in case of any doubt.</strong></p>
            <br />
            <p>Regards,<br />
            Placement Cell</p>
            `
        };

        // Add each recipient to the 'to' field
        mailOptions.to = student_id.join(',');

        await transporter.sendMail(mailOptions);
        // for (let i = 0; i < student_id.length; i++) {
        //     const email = student_id[i];
        //     await transporter.sendMail({
        //         from: `${process.env.NODEMAILER_EMAIL}`,
        //         to: email,
        //         subject: "Registration open for" + company_name,
        //         html: `<p>Job profile open for ${company_name} company.</b>
        //         Do register if you wish to.
        //         </p>`,
        //     });

        //     console.log(`email sent to ${email} for student ${student_id}`);
        // }
        return;
    }
    catch (err) {
        if (err.code === 11000) throw new ForbiddenError("Reset already requested");
        throw new Error(err);
    }
}

module.exports = {
    registerMail,
    deregisterMail,
    jobProfileMail
};