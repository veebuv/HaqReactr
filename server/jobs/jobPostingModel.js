/**
 * Created by VaibhavNamburi on 15/01/2016.
 */
var mongoose = require('mongoose');

var JobPostingSchema = new mongoose.Schema({
    postedBy : {type : String},
    appliedBy : {type : Array},
    jobTitle : {type : String},
    description : {type : String},
    company : {type : String},
    experience : {type : String},
    companyLinkedIn :{type : String},
    resumes : {type : Array},
    postedDate : {type : Date, default : Date.now}
});

module.exports = mongoose.model('JobPosting',JobPostingSchema);
