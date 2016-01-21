angular.module('app', ['ui.router',
    'ui.bootstrap',
    'app.controller',
    'home.controller',
    'login.controller',
    'auth.controller',
    'profiles.controller',
    'updateProfile.controller',
    'userFactory',
    'profileFactory',
    'httpFactory',
    //Job Posting
    'jobPosting.factory',
    'jobPosting.jobPostingPost.controller',
    'jobPosting.jobPostingSearch.controller',
    'jobPosting.jobPostingSpecific.controller',
    'jobPosting.jobPostingApply.controller',
    'jobPosting.jobPostingPostedJob.controller',
    'jobPosting.jobPostingAppliedJob.controller',
    //Chat
    'chat.controller',
    'chat.factory',
    //CodeShare
    'codeShare.controller',
    'codeShare.factory',

])

.run(function($rootScope, User, $state) {
  // Attempt to log the user in if there is an
  var userID = window.localStorage.getItem('hr-alum.user.id');
  if (userID) User.login(userID);

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    var githubName = window.localStorage.getItem('hr-alum.user.githubName');

    // Prevent unauthenticated users from accessing any states NOT listed below in the if conditional
    if (!User.loggedIn() && toState.name !== 'app.login'
                         && toState.name !== 'app.auth'
                         && toState.name !== 'app.home') {
      event.preventDefault();
      $state.go('app.home');

    // Prevent logged in users from being able to access and update other user's updateProfile section
    } else if ( toState.name === 'app.updateProfile' && toParams.githubName !== githubName) {
      event.preventDefault();
      $state.go('app.home');
    }
  })
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('app', {
      url: '/',
      views: {
        'mainContent@': {
          templateUrl: 'app/home/home.html',
          controller: 'AppCtrl'
        },
        'chat': {
          templateUrl: 'app/chat/chat.html',
          controller: 'ChatCtrl'
        }
      }
    })
    .state('app.home', {
      url: 'home',
      views: {
        'mainContent@': {
          templateUrl: 'app/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.login', {
      url: 'login',
      views: {
        'mainContent@': {
          templateUrl: 'app/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.auth', {
      url: 'auth/:userID',  // Server routes back here after authenticating with GitHub

      views: {
        'mainContent@': {
          templateUrl: 'app/login/login.html',
          controller: 'AuthCtrl'
        }
      }
    })
    .state('app.profiles', {
      url: 'profiles',
      views: {
        'mainContent@': {
          templateUrl: 'app/profiles/profiles.html',
          controller: 'ProfilesCtrl'
        }
      }
    })
    .state('app.updateProfile', {
      url: 'updateProfile/:githubName',
      views: {
        'mainContent@': {
          templateUrl: 'app/updateProfile/updateProfile.html',
          controller: 'UpdateProfileCtrl'
        }
      }
    })
    .state('app.codeShare', {
      url: 'codeShare',
      views: {
        'mainContent@': {
          templateUrl: 'app/codeShare/codeShare.html',
          controller:  'CodeShareCtrl'
        }
      }
    })
    .state('app.codeShare.create', {
      url: '/create',
      views: {
        'mainContent@': {
          templateUrl: 'app/codeShare/codeShareCreate.html',
          controller:  'CodeShareCtrl'
        }
      }
    })      
    .state('app.jobPostings', {
      views: {
        'mainContent@': {
          templateUrl: 'app/jobPostings/jobPosting/jobPostings.html',
        }
      }
    })
    .state('app.jobPostings.Search', {
      views: {
        'jobPostings@app.jobPostings': {
          templateUrl: 'app/jobPostings/jobPostingSearch/jobPostingsSearch.html',
          controller: 'jobSearchingCtrl'
        }
      }
    })
    .state('app.jobPostings.Post', {
      views: {
        'jobPostings@app.jobPostings': {
          templateUrl: 'app/jobPostings/jobPostingPost/jobPostingsPost.html',
          controller: 'jobPostingCtrl'
        }
      }
    })
    .state('app.jobPostings.SpecificJob',{
      params : {
        id : null,
        jobTitle : null,
        description : null,
        company : null,
        experience : null,
        companyLinkedIn : null

      },
      views: {
        'jobPostings@app.jobPostings': {
          templateUrl: 'app/jobPostings/jobPostingSpecific/jobPostingsSpecific.html',
          controller: 'specificJobCtrl',
        }
      }
    })
    .state('jobPostings.Apply',{
      views : {
        'mainContent@' : {
          templateUrl : 'app/jobPostings/jobPostingApply/jobPostingsApply.html',
          controller : 'jobApplyCtrl'
        }
      }
    })
    .state('app.jobPostings.appliedJobs',{
      views : {
        'mainContent@' : {
          templateUrl : 'app/jobPostings/jobPostingAppliedJob/jobPostingAppliedJobs.html',
          controller : 'appliedJobCtrl'
        }
      }
    })
    .state('app.jobPostings.postedJobs',{
      views : {
        'mainContent@' : {
          templateUrl : 'app/jobPostings/jobPostingPostedJob/jobPostingPostedJobs.html',
          controller : 'postedJobCtrl'
        }
      }
    })
}])
