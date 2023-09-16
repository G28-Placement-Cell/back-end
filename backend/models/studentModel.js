const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    surname:{
        type:String,
        required:[true,"Please enter a surname"],
    },
    student_id:{
        type:String,
        required:[true,"Please enter a student id"],
        unique:true,
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    skype_id:{
        type:String,
        required:[true,"Please enter a skype id"],
    },
    Date_of_birth:{
        type:Date,
        required:[true,"Please enter a date of birth"],
    },
    phone_number:{
        type:String,
        required:[true,"Please enter a phone number"],
    },
    alt_phone_number:{
        type:String,
        required:[true,"Please enter a alt phone number"],
    },
    father_name:{
        type:String,
        required:[true,"Please enter a father name"],
    },
    mother_name:{
        type:String,
        required:[true,"Please enter a mother name"],
    },
    per_address:{
        type:String,
        required:[true,"Please enter a permanent address"],
    },
    cur_address:{
        type:String,
        required:[true,"Please enter a current address"],
    },
    tenth_percentage:{
        type:Number,
        required:[true,"Please enter a 10th percentage"],
    },
    twelve_percentage:{
        type:Number,
        required:[true,"Please enter a 12th percentage"],
    },
    cpi:{
        type:Number,
        required:[true,"Please enter a CPI"],
    },
    branch:{
        type:String,
        required:[true,"Please enter a branch"],
    },
    registering_for:{
        type:String,
        required:[true,"Please enter a registering for"],
    },
    in_drive:{
        type:Boolean,
        required:[true,"Please enter a interested in"],
    },
    current_backlogs:{
        type:Number,
        required:[true,"Please enter a current backlogs"],
    },
    total_backlogs:{
        type:Number,
        required:[true,"Please enter a total backlogs"],
    },
    resume:{
        type:String,
        required:[true,"Please enter a resume"],
    },
    resume: {
        data: Buffer,
        contentType: String,
    },
    



}, {
    timestamp: true
})


module.exports = mongoose.model("User", userschema);