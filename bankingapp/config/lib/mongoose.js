/**
 * Created by MrKK on 9/1/16.
 */
'use strict';
var mongoose = require('mongoose'),
    config = require('../config'),
    path = require('path'),
    account = require(path.join(process.cwd(), 'modules/core/server/models/core.server.model')),
    addressT = require(path.join(process.cwd(), 'modules/core/server/models/address.server.model')),
    branchT = require(path.join(process.cwd(), 'modules/core/server/models/branch.server.model')),
    checkingT = require(path.join(process.cwd(), 'modules/core/server/models/checking.server.model')),
    savingsT = require(path.join(process.cwd(), 'modules/core/server/models/savings.server.model')),
    customerT = require(path.join(process.cwd(), 'modules/core/server/models/customer.server.model')),
    transactionT = require(path.join(process.cwd(), 'modules/core/server/models/transaction.server.model'));

module.exports.connect = function(callback){
    
    var db = mongoose.connect(config.db.uri, config.db.options, function(err){
        if(err){
            console.log("ERROR: Can't connect to the Database!");
            console.log(err);
        }
        else{
            if(callback) callback(db);
        }
    })
}