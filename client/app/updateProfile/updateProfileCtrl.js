angular.module('updateProfile.controller', ['ui.router'])

.controller('UpdateProfileCtrl', ['$scope', '$stateParams','HttpRequest', function ($scope, $stateParams, HttpRequest){
  $scope.submitProfile = function (isValid, formData) {
    HttpRequest.submitProfile(isValid, formData);
  }

  //prepopulation of data
  HttpRequest.getProfile($stateParams.githubName)
    .then(function (res) {
      $scope.data = res.data;
    })
}])
