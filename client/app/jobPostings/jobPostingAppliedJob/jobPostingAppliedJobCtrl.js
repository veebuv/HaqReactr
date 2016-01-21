angular.module('jobPosting.jobPostingAppliedJob.controller', ['ui.router'])

.controller('appliedJobCtrl',['$scope','$http','jobPostingFactory','$state',function($scope,$http,jobPostingFactory,$state){

    jobPostingFactory.appliedJobs(window.localStorage.getItem('hr-alum.user.id'))
        .then(function(data){
            $scope.appliedJobs = data;
        });

    $scope.goToJob = function(job){
        $state.go('app.jobPostings.SpecificJob',job);
    }
}]);

