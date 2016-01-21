angular.module('codeShare.controller', ['ui.router'])

.controller('CodeShareCtrl', ['$scope', '$http', '$state', 'CodeShare', function($scope, $http, $state, CodeShare) {

  $scope.newCodeShare = {
    tags: []
  };

  CodeShare.getCode()
    .then(function(res) {
      $scope.codeShares = res;
    });

  $scope.addTag = function() {
    if ($scope.newCodeShare.tags.indexOf($scope.tag) === -1) {
      $scope.newCodeShare.tags.push($scope.tag);
      $scope.tag = '';
    }
  };

  $scope.removeTag = function(tag) {
    var tags = $scope.newCodeShare.tags;
    tags.splice( tags.indexOf(tag), 1 );
  };

  $scope.hasVoted = function (code) {
    var userID = window.localStorage.getItem('hr-alum.user.id');
    return code.votesFrom.indexOf(userID) !== -1;
  };

  $scope.upvote = function (code) {
    var userID = window.localStorage.getItem('hr-alum.user.id');
    if ( code.votesFrom.indexOf(userID) === -1 ) {
      code.votesFrom.push(userID);
      code.upvotes++;
      CodeShare.upvote(code._id, userID);
    }
  };

  $scope.submitCodeShare = function () {
    $scope.newCodeShare.createdBy = window.localStorage.getItem('hr-alum.user.id');
    CodeShare.postCode($scope.newCodeShare)
      .then(function(){
        $state.go('app.codeShare');
      });
  };

  // Opens modal window to display CodeShares
  $scope.codeDetailsModal = function(code) {
    $scope.code = code;
    $('#codeDetailsModal').openModal();
  };


  $scope.createCodeShare = function() {
    $state.go('app.codeShare.create');
  }; 

}])
