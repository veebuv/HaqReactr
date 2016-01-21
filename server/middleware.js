var morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    authRouter = require('./authRoutes.js');

module.exports = function(app,express){
    var apiRouter = express.Router();

    app.use(express.static(__dirname + '/../client'));
    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded( {extended:true,limit : '50mb'} ));
    app.use(bodyParser.json({limit : '50mb'}));


    app.use('/auth',authRouter);
    app.use('/api',apiRouter);
    require('./apiRoutes')(apiRouter)
};
