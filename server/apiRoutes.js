/**
 * Created by VaibhavNamburi on 16/01/2016.
 */
var jobPostingController = require('./jobs/jobPostingController');
var userController = require('./users/userController.js')
var codeShareController = require('./codeShare/codeController.js');
var chatController = require('./chat/chatController.js');

module.exports = function(apiRouter){

    /*     Routes beginning with /api/profiles

     See documentation at corresponding
     function in request-handler.js
     */
    apiRouter.get( '/users',             userController.findAll);
    apiRouter.get( '/users/:githubName', userController.findOne);

    apiRouter.post('/users/login',       userController.login);


    apiRouter.post('/updateProfile', userController.updateProfile);

    apiRouter.get( '/codeShare', codeShareController.getSharedCode);
    apiRouter.post('/codeShare', codeShareController.createSharedCode);
    apiRouter.post('/codeShare/upvote', codeShareController.upvote);

    /*     Routes beginning with /api/jobPostings
     See documentation at corresponding
     function in jobPostingController.js
     */
    apiRouter.get('/jobPostings', jobPostingController.getJobPosting);
    apiRouter.post('/jobPostings', jobPostingController.createJobPosting);
    //apiRouter.get('/jobPostings/:specificJob',jobPostingController.specificJobPosting);
    apiRouter.put('/jobPostings/jobResume', jobPostingController.addResumeToJobPosting);

    apiRouter.get('/jobPostings/appliedJobs', jobPostingController.appliedJobs);
    apiRouter.get('/jobPostings/postedJobs', jobPostingController.postedJobs);

    apiRouter.get('/chat/clients', chatController.getClients);


}
