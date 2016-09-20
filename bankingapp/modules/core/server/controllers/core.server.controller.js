/**
 * Created by MrKK on 9/1/16.
 */


var service = require('../services/core.server.service');

module.exports.getAccounts = function(req, res) {
    
   service.getAccounts(function(err, data){
        console.log(data);
        if(err) {
            res
                .status(400)
                .send({message: "Error"});
        }
        else {
            res
                .status(200)
                .json(data);
        }
    });
}

module.exports.saveAccount = function(req, res) {
    
    var acc = req.body;
    
    service.saveAccount(acc, function(err, data){
        
        if(err){
            res
                .status(400)
                .send({message:'Error'});
        }
        else {
            res
                .status(200)
                .json(data);
        }
    });
}

/*
module.exports.deleteAccount = function(req, res){
    var id = req.params.id;
    console.log(id);
    service.deleteAccount(id, function(err, data){
        if(err){
            res
                .status(400)
                .send({message:'Error'});
        }
        else {
            res
                .status(200)
                .json(data);
        }
    })
}*/

/*module.exports.updateAccount = function(req, res){
    var id = req.params.id;
    var account = req.body;
    service.updateAccount(id, account, function(err, data){
        if(err) {
            res
                .status(400)
                .send({message: "Error"});
        }
        else {
            res
                .status(200)
                .send(data);
        }
    })
}*/

module.exports.createAccount = function(req, res){
    var type = req.body.accountType;
    var info = req.body;
    service.createAccount(type, info, function(err, data){
        if(err){
            console.log(err);
            res
                .status(400)
                .send("Error");
        }
        
        else {
            res
                .status(200)
                .json(data);
        }
    });
    
}

module.exports.getCustomerInfo = function(req, res){
    var id= req.params.id;
    service.getCustomerInfo(id, function(err, data){
        if(err){
            res
                .status(400)
                .send({message: "Couldn't get Customer Info"});
        }
        else {
            res
                .status(200)
                .json({"CustomerInfo": data});
        }
    })
}

module.exports.deleteAccount = function(req, res){
    var id = req.params.id;
    service.deleteAccount(id, function(err){
        if(err) {
            res
                .status(400)
                .send({message : "Couldn't Delete the Customer Account!"})
        }
        else {
            res
                .status(200)
                .send({message: "Customer Account Deleted!"})
        }
    })
}

module.exports.getAllAccounts = function(req, res){
    service.getAllAccounts(function(err, data){
        if(err){
            res
                .status(400)
                .send({message: "Couldn't get all accounts."});
        }
        else {
            res
                .status(200)
                .json(data);
        }
    })
}

module.exports.updateAccount = function(req, res){
    var id = req.params.id;
    var updated = req.body;
    console.log(updated);
    service.updateAccount(id, updated, function(err){
        if(err) {
            res
                .status(400)
                .send({message: "Couldn't Update Account."});
        }
        else {
            res
                .status(200)
                .send({message: "Customer Account Updated!"});
        }
    })
}

module.exports.depositMoney = function(req, res){

    var id = req.body.id;
    var amount = req.body.amount;
    var accType = req.body.accType;
    
    service.depositMoney(id, amount, accType, function(err, data){
        if(err) {
            res
                .status(400)
                .send({message:"Couldn't Deposit Money."});
        }
        else {
            res
                .status(200)
                .send("Deposit Transaction Successful. Here's the Transaction id: "+data);
        }
    });
}

module.exports.withdrawMoney = function(req, res){
    
    var id = req.body.id,
        accType = req.body.accType;
        amount = req.body.amount;

    service.withdrawMoney(id, amount, accType, function(err, data){
        if(err) {
            res
                .status(400)
                .send({message:"Couldn't Withdraw Money."});
        }
        else {
            res
                .status(200)
                .send("Withdrawal Transaction Successful. Here's the Transaction id: "+data);
        }
    });
}

module.exports.transferMoney = function(req, res){

    var sendId = req.body.sendId,
        recId = req.body.recId,
        sAccType = req.body.sAccType,
        rAccType = req.body.rAccType;
        amount = req.body.amount;

    service.transferMoney(sendId, recId, amount, sAccType, rAccType, function(err, data){
        if(err) {
            res
                .status(400)
                .send({message:"Couldn't Transfer Money."});
        }
        else {
            res
                .status(200)
                .send("Money Transfer Transaction Successful. Here's the Transaction id: "+data);
        }
    });

}

module.exports.getAllCustomers = function(req, res){
    service.getAllCustomers(function(err, data){
        console.log("Controller: "+data);
        if(err) {
            res
                .status(400)
                .send("Error getting customer data!");
        }
        else {
            res
                .status(200)
                .json(data);
        }
    })
}

module.exports.login = function(req, res){
    var uname = req.body.uname,
        pass = req.body.password;
    console.log(uname+" "+pass);
    service.login(uname, pass, function(err, data){
        if(err){
            res.redirect('/');
        }
        else {
            req.session.userId = data._id;
            res.redirect('/api/dashboard');
        }
    });
}
