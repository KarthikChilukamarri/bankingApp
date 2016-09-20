/**
 * Created by MrKK on 9/1/16.
 */

var express = require("./express"),
    path = require('path'),
    mongoose = require('./mongoose'),
    config = require('../config');

module.exports.loadRoutes = function(app) {
    
    var coreRoutes = require(path.join(process.cwd(),'modules/core/server/routes/core.server.routes'));
    coreRoutes(app);
}


module.exports.start = function(){
    
    var self = this;
    
    mongoose.connect(function(db){
        
        var app = express.init();
        self.loadRoutes(app);
        app.listen(config.app.port, function(){
            console.log("Application running on port: "+config.app.port);
        });
        
    });
}