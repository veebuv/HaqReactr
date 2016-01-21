angular.module('httpFactory', [])

.factory('HttpRequest', ['$http', '$q', function ($http, $q){
  var deferred= $q.defer();
  var submitProfile = function (isValid, data) {
    if (isValid) {
        return $http({
            method: 'POST',
            url: '/api/updateProfile',
            data: data
        })
    } else {

    }
  };

  var getProfiles= function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    }).success(function(result){
      deferred.resolve(result); 
    }).error(function (result){
      deferred.reject(result);
    })
  }

  var getProfile= function (githubName){
    return $http({
      method: 'GET',
      url: '/api/users/'+githubName
    }).success(function(result){
      deferred.resolve(result);
    }).error(function (result){
      deferred.reject(result);
    })
  }

  return {
    submitProfile: submitProfile,
    getProfiles: getProfiles,
    getProfile: getProfile
  }
}])