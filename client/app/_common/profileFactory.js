angular.module('profileFactory', [])

.factory('Profile', function (){
  var storedProfile; 

  var setProfile = function (profile) {
    storedProfile = profile;
    return storedProfile;  
  };

  var getProfile = function (){
    return storedProfile; 
  };

  return {
    setProfile: setProfile,
    getProfile: getProfile
  };

})
