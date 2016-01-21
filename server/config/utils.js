
var checkUser = function(req, res, next) {
  if  (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

var defaultJobPostingProperties = function(dbResults) {

    var defaultProps = {
      _id : 'id',
      jobTitle : 'jobTitle',
      resumes : 'resumes',
      description : 'description',
      company : 'company',
      experience : 'experience',
      companyLinkedIn :'companyLinkedIn',
      postedDate : 'postedDate'
    }

  return selectProperties(dbResults,defaultProps)

}

var selectProperties = function(dbResults,props){
  if (typeof props !== 'object' || props === null) return dbResults;

  if ( Array.isArray(dbResults) ) {
    return dbResults.map(function(oldObj){
      return Object.keys(props).reduce(function(newObj, key){
        newObj[props[key]] = oldObj[key];
        return newObj;
      },{});
    });
  } else {
    return Object.keys(props).reduce(function(newObj, key){
      newObj[props[key]] = dbResults[key];
      return newObj;
    },{});
  }

};

var buildDefaultQuery = function(req){
  var query = {};

  var jobTitle = req.query.jobTitle;
  var company = req.query.company;

  if(!jobTitle || !company){
    query['$or'] = [{jobTitle : /jobTitle/},{company : company}]
  }
  else if(jobTitle && company){
    query['$and'] = [{jobTitle : jobTitle},{company : company}]
  }

  return query;


};
module.exports = {
  defaultJobPostingProperties : defaultJobPostingProperties,
  selectProperties : selectProperties,
  checkUser : checkUser,
  buildDefaultQuery : buildDefaultQuery
}
