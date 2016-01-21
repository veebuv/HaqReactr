angular.module('jobPosting.jobPostingSearch.controller', ['ui.router'])

.controller('jobSearchingCtrl',['$scope','$http','jobPostingFactory','$state',function($scope,$http,jobPostingFactory,$state){

    $scope.data ={
        jobTitle : '',
        company : '',
    };

    $scope.relevantJobPostings = ''

    $scope.$watch('[data.jobTitle,data.company]',function(){
        if($scope.data.jobTitle !== '' || $scope.data.company !== ''){
            jobPostingFactory.getJob($scope.data).then(function(data){
                $scope.relevantJobPostings = data
            });
        }

    });

    $scope.goToJob = function(job){
        $state.go('app.jobPostings.SpecificJob',job);

    }

}])
