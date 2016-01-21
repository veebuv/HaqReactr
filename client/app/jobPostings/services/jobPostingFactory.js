angular.module('jobPosting.factory', [])



.factory('jobPostingFactory',function($http){

    var apiUrl = 'http://teslalegacy.herokuapp.com';

    var postJob = function(jobPosting){

        return $http.post(  '/api/jobPostings', jobPosting)
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };

    var getJob = function(jobSearch){

        return $http.get(  '/api/jobPostings', {
                params : {
                    jobTitle : jobSearch.jobTitle,
                    company : jobSearch.company
                }
            })
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };

    //var specificJob = function(jobID){
    //    return $http.get(apiUrl + '/api/jobPostings/' + jobID)
    //        .then(function(res) {
    //            return res.data;
    //        }, function(err) {
    //            return err;
    //        });
    //};

    var postResume = function(resumePosted){
        return $http.put( '/api/jobPostings/jobResume', resumePosted)
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };

    var appliedJobs = function(userID){

        return $http.get('/api/jobPostings/appliedJobs', {
            params : {
                userID : userID
            }
        })
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };

    var postedJobs = function(userID){

        return $http.get( '/api/jobPostings/postedJobs', {
            params : {
                userID : userID
            }
        })
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };


    return{
        postJob : postJob,
        getJob : getJob,
        //specificJob : specificJob,
        postResume : postResume,
        appliedJobs : appliedJobs,
        postedJobs : postedJobs
    }

})
