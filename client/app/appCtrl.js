angular.module('app.controller', [])

.controller('AppCtrl', function($scope, $state, User) {

  $scope.user = User.details;

  $scope.loggedIn = function() {
    return User.loggedIn()
  };

  $scope.logout = function() {
    User.logout();
  };
  
})
