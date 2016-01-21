var JobPosting = require('./jobPostingModel.js');
var bluebird = require('bluebird');
var util = require('../config/utils.js')

var defaultJobPostingProps = util.defaultJobPostingProperties;
var buildDefaultQuery = util.buildDefaultQuery;

module.exports = {


    createJobPosting : function(req,res,next){
        var data = req.body;
        var jobPosting = {
            postedBy : data.postedBy,
            jobTitle : data.jobTitle,
            description : data.description,
            company : data.company,
            experience : req.body.experience,
            companyLinkedIn :req.body.companyLinkedIn,
            postedDate : req.body.postedDate
        }

        JobPosting(jobPosting).save()
            .then(function(createdJobPosting){
                if(createdJobPosting){
                    res.status(201).json(defaultJobPostingProps(createdJobPosting));
                }
            })
            .catch(function(err){
                throw err;
            })

    },

    getJobPosting : function(req,res,next){
        var dbQuery = buildDefaultQuery(req);
        var resultLimit = Number(req.query.resultLimit) || 10;

        JobPosting.find(dbQuery)
            .limit(resultLimit)
            .then(function(dbResults){
                res.json(defaultJobPostingProps(dbResults))
            })
            .catch(function(err){
                throw err;
            });
    },

    specificJobPosting : function(req,res,next){

        JobPosting.find({_id : req.params.id})
            .then(function(dbResult){
                res.json(defaultJobPostingProps(dbResult))
            })

    },

    addResumeToJobPosting : function(req,res,next){
        console.log(req.body)
        var appliedBy = req.body.appliedBy;
        var jobPostingID = req.body.jobId;
        var resumeFile = req.body.resume;

        JobPosting.findByIdAndUpdate(
            jobPostingID,
            {$push: {"resumes": resumeFile, "appliedBy" : appliedBy}},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                console.log(err);
            }
        );
    },

    appliedJobs : function(req,res,next){
        var userID = req.query.userID;
        console.log("I HAVE APPLIED HERE",userID);
        JobPosting.find({appliedBy : {'$in' : [userID]}})
            .then(function(dbResult){
                res.json(defaultJobPostingProps(dbResult))
            })

    },

    postedJobs : function(req,res,next){
        var userID = req.query.userID;
        JobPosting.find({postedBy : {'$in' : [userID]}})
            .then(function(dbResult){
                res.json(defaultJobPostingProps(dbResult))
            })

    }
}
