angular.module('jobPosting.jobPostingPost.controller', ['ui.router'])

    .controller('jobPostingCtrl',['$scope','$http','jobPostingFactory',function($scope,$http,jobPostingFactory){

        $scope.data ={
            postedBy : window.localStorage.getItem('hr-alum.user.id'),
            jobTitle : '',
            description : '',
            company : '',
            experience : '',
            companyLinkedIn : ''
        }

        $scope.jobPostingSubmit = function(){
            $scope.data.jobTitle.toLowerCase();

            jobPostingFactory.postJob($scope.data).then(function(data){
                console.log(data)
            })
        }



    }])
