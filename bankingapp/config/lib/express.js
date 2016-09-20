/**
 * Created by MrKK on 9/1/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var consolidate = require('consolidate'),
    config = require('../config'),
    swig = require('swig'),
    path = require('path'),
    session = require('express-session');


module.exports.init = function() {
    var app = express();
    this.initBodyParser(app);
    this.initViewEngine(app);
    this.ignoreStatic(app);
    this.initExpressSession(app);

    return app;
}

module.exports.initBodyParser = function(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());
}

module.exports.initExpressSession = function(app){
    app.set('trust proxy', 1); // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
}

module.exports.initViewEngine = function(app) {
    app.engine('server.view.html', consolidate['swig']);
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(process.cwd(), 'modules/core/server/views'));

}

module.exports.ignoreStatic = function(app) {

    app.use('/public', express.static(path.resolve('./public')));

    config.client.files.forEach(function(staticPath){

        app.use(staticPath, express.static(path.resolve('./' + staticPath)));
    })
    
}


//app.use('/modules/core/client/app', express.static(path.join(process.cwd(),'modules/core/client/app')));

