// Server routes back here after authenticating with GitHub
angular.module('auth.controller', ['ui.router'])

.controller('AuthCtrl', ['$scope', '$stateParams', '$state', 'User',  function ($scope, $stateParams, $state, User){

  var userID = $stateParams.userID;
 
  User.login(userID)
      .then(function() {
        $state.go('app.home')
      });
}]);
