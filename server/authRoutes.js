var express = require('express');
var router = express.Router();
var passport = require('passport');
var userController = require('./users/userController.js')
var GithubStrategy = require('passport-github2').Strategy;

router.get('/github',
  passport.authenticate('github', {
    scope: ['user', 'user:email', 'read:org']
  }),
  function(req, res) {
    // place where github authentication should occur based on certain inputs
    //passport.authenticate('github', { scope: [ 'user:email' ] }));
  });

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    userController.userExists(req.user.username)
      .then(function(user) {
        if (user) res.redirect( '/#/auth/' + user._id ); // user exists, send ID to client for login
        else      userController.createUser({body:req.user, fromGitHub:true}, res); // user doesn't exist, create
      })
      .catch(function(err){
        throw err;
      })
  });



module.exports = router;
