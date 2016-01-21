angular.module('jobPosting.jobPostingApply.controller', ['ui.router'])

.controller('jobApplyCtrl',['$scope','$http','jobPostingFactory','$state','items','$uibModalInstance',function($scope,$http,jobPostingFactory,$state,items,$uibModalInstance){

    var resumeBase64;

    $scope.resumeUpload = function(event){

        var files = event.target.files; //FileList object

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(file);
        }
    };

    $scope.imageIsLoaded = function(e){

        $scope.$apply(function() {
            resumeBase64 = e.target.result
        });
    }

    $scope.submitResume = function(){
        var submitObject = {
            jobId : items,
            resume : resumeBase64,
            appliedBy :  window.localStorage.getItem('hr-alum.user.id')
        };

        jobPostingFactory.postResume(submitObject);
        $uibModalInstance.close();
        $state.go('app.jobPostings');
    }

}]);
