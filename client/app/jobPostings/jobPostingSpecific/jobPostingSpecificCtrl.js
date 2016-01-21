angular.module('jobPosting.jobPostingSpecific.controller', ['ui.router'])

.controller('specificJobCtrl',['$scope','$http','jobPostingFactory','$stateParams','$uibModal',function($scope,$http,jobPostingFactory,$stateParams,$uibModal){

    $scope.data = {
        specificJob : {
            jobTitle : $stateParams.jobTitle,
            description : $stateParams.description,
            company : $stateParams.company,
            experience : $stateParams.experience,
            companyLinkedIn : $stateParams.companyLinkedIn
        }
    };


    $scope.showApplyModal = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/jobPostings/jobPostingApply/jobPostingsApply.html',
            controller: 'jobApplyCtrl',
            resolve: {
                items: function () {
                    return $stateParams.id;
                },
                size: function() {
                    console.log('size: ', size);
                    return 'sl';
                }
            },
            backdropClass : "modal-body"
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

}])
