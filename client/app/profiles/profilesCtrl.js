angular.module('profiles.controller', ['ui.router'])

.controller('ProfilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles().then(function (res) {
    $scope.profiles = res.data;
    $scope.categories = $scope.getCategories();
  });

  $scope.categories = [];

  $scope.filter = {};

  $scope.showCard = false;

  $scope.getCategories = function () {
    // want the keys of the profile object
    var categories = [];
    var example = $scope.profiles[0] || {};
    for (var key in example) {
      if (key && example.hasOwnProperty(key) && typeof example[key] === 'object') {
        for (var subKey in example[key]) {
          categories.push(subKey);
        }
      }
    }
    return categories;
  };

  $scope.filterByCategory = function (person) {
    for (var key in person) {
      if (key && person.hasOwnProperty(key) && typeof person[key] === 'object') {
        for (var subKey in person[key]) {
          if ($scope.filter[subKey]) {
            // box is checked and value of that profile object at that property of $scope.filter is not null or ''
            if (!person[key][subKey]) {
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  $scope.toggleCard = function() {
      return $scope.showCard = !$scope.showCard;
  };

  // used for showing the modal in profiles.html
  $scope.modalDetails = function(profile){
    $scope.profile = profile;
    $('#modalDetails').openModal();
  };

}]);
