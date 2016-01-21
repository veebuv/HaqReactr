angular.module('jobPosting.jobPostingPostedJob.controller', ['ui.router','ngSanitize'])

.controller('postedJobCtrl',['$scope','$http','jobPostingFactory','$state',function($scope,$http,jobPostingFactory,$state){

    jobPostingFactory.postedJobs(window.localStorage.getItem('hr-alum.user.id'))
        .then(function(data){
            $scope.appliedJobs = data;
        });

    $scope.showResumes = function(job){
        $scope.allResumes = job.resumes;
    };

    $scope.downloadResumes = function(job){
        job.resumes.forEach(function(eachResume){
            window.open(eachResume)
        })
    }

}]);
