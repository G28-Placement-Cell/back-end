const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: [true, "Please enter a company name"],
    },
    HR_name:{
        type:String,
        required:[true,"Please enter a HR name"],
    },
    contact_number:{
        type:String,
        required:[true,"Please enter a contact number"],
    },
    company_postal_address: {
        type: String,
        required: [true, "Please enter a company postal address"],
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: true,
    },
    website:{
        type:String,
        required:[true,"Please enter a website"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    elgibility_criteria:{
        type:String,
        required:[true,"Please enter a elgibility criteria"],
    },
    CTC:{
        type:String,
        required:[true,"Please enter a CTC"],
    },
    domain:{
        type:String,
        required:[true,"Please enter a domain"],
    }
});

const Company = mongoose.model('Company', companySchema);