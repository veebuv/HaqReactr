var CodeShare = require('./codeShareModel.js');
var bluebird = require('bluebird');
var util = require('../config/utils.js')

module.exports = {
  createSharedCode: function(req, res, next) {
    var data = req.body;

    var newCodeShare = {
      title: data.title,
      createdBy: data.createdBy, // userID
      description: data.description,
      tags: data.tags,
      code: data.code
    };

    CodeShare(newCodeShare).save()
      .then(function(createdCodeShare) {
        if (createdCodeShare) {
          res.status(201).json( createdCodeShare );
        }
      })
      .catch(function(err) {
        throw err;
      })
  },

  getSharedCode: function(req, res, next) {
    var resultLimit = Number(req.query.resultLimit) || 10;

    CodeShare.find({})
      .populate('createdBy')
      .limit(resultLimit)
      .sort({postedDate:-1}) // newest first
      .then(function(dbResults) {
        res.json( dbResults );
      })
      .catch(function(err) {
        throw err;
      });
  },

  upvote : function (req, res, next) {
    var userID = req.body.userID;
    var codeID = req.body.codeID;

    var updateCommand = { $addToSet: {"votesFrom": userID}, $inc: {upvotes: 1} }; // $addToSet will not add the value if it already exists

    CodeShare.findByIdAndUpdate(codeID, updateCommand, {new:true}) // include updated values in dbResults
      .then(function(dbResults){
          var clientResults = {votesFrom: dbResults.votesFrom};
          res.json(clientResults);
      })
      .catch(function(err){
        throw err;
      });


  }
};