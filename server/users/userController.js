var User = require('../users/userModel.js');


exports.userExists = function (githubName) {
  return User.findOne({ 'contact.githubName':  githubName });
};

exports.login = function (req, res) {
    var userID = req.body._id;
    User.findOne({ _id: userID  })
      .then(function(user){
        if (!user) res.sendStatus(401); // unauthorized: invalid credentials
        else res.status(200).json( {_id: user._id, name: user.contact.name, githubName: user.contact.githubName} ); // login successful
      })
      .catch(function(err){
        throw err;
      });
}; 

exports.createUser = function(req, res) {

    if (req.fromGitHub) {
        var name = req.body['_json'].name;
        var profilePic= req.body['_json']['avatar_url'];
        var githubName = req.body.username;
        var email = req.body['_json'].email;
        var location = req.body['_json'].location;
        var summary = '';
        var status = req.body['_json'].hireable || '';
        var companies = '';
        var languages ='';
        var blog = req.body['_json'].blog || '';
        var website = '';
        var linkedin = '';
        var github = req.body['_json'].html_url;
        var project1  = '';
        var project2  = '';
        var project3  = '';
    }

    var query= User.findOne({
        'contact.githubName': githubName
    });

    query.exec(function(err, user) {
        if (!user) {
            var newUser = new User({
                contact: {
                    name: name,
                    profilePic: profilePic,
                    githubName: githubName,
                    email: email,
                    location: location
                },
                about: {
                    summary: summary,
                    status: status
                },
                experience: {
                    companies:
                    companies
                    ,
                    languages:
                    languages
                },
                links: {
                    blog: blog,
                    website: website,
                    linkedin: linkedin,
                    github: github
                },
                projects: {
                    project1: project1,
                    project2: project2,
                    project3: project3

                }
            });
            newUser.save(function(err, newUser) {
                if (err) {
                    console.log('there was an error with saving');
                    res.status(500).send(err);
                }
                res.redirect('/#/updateProfile/'+ newUser.contact.githubName)

            });
        } else {
            res.redirect('/#/updateProfile/'+ user.contact.githubName)
        }
    });
};


exports.findAll = function(req, res) {
    User.find({}).exec(function(err, profiles) {
        res.json(profiles);
    });
};

exports.findOne = function(req, res) {
    User.find({'contact.githubName':  req.params.githubName
    }).exec(function(err, profile) {
        res.json(profile);
    });
};

exports.updateProfile= function (req, res) {
    var name = req.body[0].contact.name;
    var profilePic = req.body[0].contact.profilePic;
    var githubName = req.body[0].contact.githubName;
    var email = req.body[0].contact.email;
    var location = req.body[0].contact.location;
    var summary = req.body[0].about.summary;
    var status = req.body[0].about.status;
    var companies = req.body[0].experience.companies;
    var languages = req.body[0].experience.languages;
    var blog = req.body[0].links.blog;
    var website = req.body[0].links.website;
    var linkedin = req.body[0].links.linkedin;
    var github = req.body[0].links.github;
    var project1  = req.body[0].project1;
    var project2  = req.body[0].project2;
    var project3  = req.body[0].project3;


    User.findOneAndUpdate( {'contact.githubName': githubName },
        {
            contact: {
                name: name,
                profilePic: profilePic,
                githubName: githubName,
                email: email,
                location: location
            },
            about: {
                summary: summary,
                status: status
            },
            experience: {
                companies:
                companies
                ,
                languages:
                languages
            },
            links: {
                blog: blog,
                website: website,
                linkedin: linkedin,
                github: github
            },
            projects: {
                project1: project1,
                project2: project2,
                project3: project3

            }
        }, {new:false},
        function (err, person) {
            if(err) {console.log(err) }
        })
}
