/**
 * Created by MrKK on 9/1/16.
 */

'use strict';
var mongoose = require('mongoose'),
    accounts = mongoose.model('Accounts'),
    Chance = require('chance'),
    addressT = mongoose.model('AddressTable'),
    branchT = mongoose.model('BranchTable'),
    checkingT = mongoose.model('CheckingTable'),
    savingsT = mongoose.model('SavingsTable'),
    customerT = mongoose.model('CustomerTable'),
    transactionT = mongoose.model('TransactionTable');


module.exports.getAccounts = function (callback) {

    accounts.find({}, function (err, data) {
        console.log(data);
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    })

}

module.exports.saveAccount = function (acc, callback) {

    var chance = new Chance();
    acc.accountNumber = chance.cc();
    console.log(acc);
    var account = new accounts(acc);
    account.save(function (err) {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null, acc);
        }
    });

}

/*module.exports.deleteAccount = function (id, callback) {

    accounts.findByIdAndRemove({_id: id}, function (err) {
        if (err) callback(err);
        else {
            accounts.find({}, function (err, data) {
                if (err) callback(err);
                else callback(null, data);
            })
        }
    })
}*/

module.exports.updateAccount = function (id, updatedAccount, callback) {

    var account = {
        firstName: updatedAccount.firstName,
        lastName: updatedAccount.lastName,
        zip: updatedAccount.zip,
        phone: updatedAccount.phone,
        address: updatedAccount.address,
        cash: updatedAccount.cash,
        city: updatedAccount.city,
        email: updatedAccount.email,
        accountNumber: updatedAccount.accountNumber
    }
    accounts.findByIdAndUpdate(id, account, function (err) {
        if (err) callback(err);
        else callback(null, account);
    });
}

module.exports.createAccount = function (type, info, callback) {

    var chance = new Chance();
    console.log(info);
    var branc = {
        branchCode: chance.integer({min: 0}),
        branchName: info.branchName,
        branchLocation: chance.city(),
        dateOfCreation: chance.date({string: true})
    }
    var add = {
        zip: chance.zip(),
        city: chance.city(),
        phone: chance.phone(),
        email: chance.email(),
        street: chance.address(),
        dateOfCreation: branc.dateOfCreation
    }
    var branch = new branchT(branc);
    branch.save(function (err) {
        if (err) {
            console.log("Branch Save Error");
            console.log(err);

        }
        else {
            branchT.findOne({branchCode: branc.branchCode}, function (err, data) {
                if (err) console.log("Couldn't find Branch");
                else {
                    var branchId = data._id;
                    console.log("branch save Successful.");
                    var address = new addressT(add);
                    address.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            addressT.findOne({phone: add.phone}, function (err, data) {
                                if (err) console.log(err);
                                else {
                                    var addId = data._id;
                                    console.log("Address save Successful.");

                                    if (type == 'Checking') {
                                        var check = {
                                            accountType: info.accountType,
                                            accountNumber: chance.cc(),
                                            cash: info.cash,
                                            dateOfCreation: branc.dateOfCreation,
                                            branchId: branchId
                                        }
                                        var checking = new checkingT(check);
                                        checking.save(function (err) {
                                            if (err) console.log("Couldn't Save Checking: " + err);
                                            else {
                                                checkingT.findOne({accountNumber: check.accountNumber}, function (err, data) {
                                                    if (err) console.log("Couldn't find checking");
                                                    else {
                                                        var checkId = data._id;
                                                        console.log("Checking Save Successful.");

                                                        var custC = {
                                                            /*userName: info.userName,
                                                            password: info.password,*/
                                                            firstName: info.firstName,
                                                            lastName: info.lastName,
                                                            _id: chance.guid(),
                                                            checkingId: checkId,
                                                            addressId: addId,
                                                            savingsId: "",
                                                            branchId: branchId,
                                                            dateOfCreation: branc.dateOfCreation
                                                        }
                                                        var customer = new customerT(custC);
                                                        customer.save(function (err) {
                                                            if (err) console.log("Couldn't save Customer: " + err);
                                                            else {
                                                                customerT.findOne({_id: custC._id}, function (err, data) {
                                                                    if (err) {
                                                                        console.log("Couldn't find customer");
                                                                        callback(err);
                                                                    }
                                                                    else {
                                                                        var dataToDisplay = {
                                                                            firstName: data.firstName,
                                                                            lastName: data.lastName,
                                                                            _id: data._id,
                                                                            checkingId: data.checkingId,
                                                                            addressId: data.addressId,
                                                                            savingsId: data.savingsId,
                                                                            branchId: data.branchId,
                                                                            dateOfCreation: data.dateOfCreation
                                                                        }
                                                                        console.log("Customer save Successful");
                                                                        callback(null, dataToDisplay);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                });


                                            }
                                        })

                                    }

                                    else if (type == "Savings") {
                                        var save = {
                                            accountType: info.accountType,
                                            accountNumber: chance.cc(),
                                            cash: info.cash,
                                            dateOfCreation: branc.dateOfCreation
                                        }

                                        var savings = new savingsT(save);
                                        savings.save(function (err) {
                                            if (err) console.log("Couldn't Save Saving");
                                            else {
                                                savingsT.findOne({accountNumber: save.accountNumber}, function (err, data) {
                                                    if (err) console.log("Couldn't find Saving");
                                                    else {
                                                        var saveId = data._id;
                                                        console.log("Saving Save Successful.");

                                                        var custS = {
                                                            firstName: info.firstName,
                                                            lastName: info.lastName,
                                                            _id: chance.guid(),
                                                            checkingId: "",
                                                            addressId: addId,
                                                            savingsId: saveId,
                                                            branchId: branchId,
                                                            dateOfCreation: branc.dateOfCreation
                                                        }
                                                          var customer = new customerT(custS);
                                                        customer.save(function (err) {
                                                            if (err) console.log("Couldn't save Customer: "+err);
                                                            else {
                                                                customerT.findOne({_id: custS._id}, function (err, data) {
                                                                    if (err) {
                                                                        console.log("Couldn't find customer");
                                                                        callback(err);
                                                                    }
                                                                    else {
                                                                        callback(null, data);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                });


                                            }
                                        })
                                    }
                                }
                            });

                        }
                    });
                }

            })
        }
    })
}

module.exports.getCustomerInfo = function (id, callback) {

    customerT.findOne({_id: id}, function (err, data) {
        if (!data) {
            console.log("Couldn't find Customer: " + err);
            callback(!data);
        }
        else {
            var cust = data;
            var add, check, branch, save;
            addressT.findOne({_id: cust.addressId}, {_id: 0, __v: 0}, function (err, data) {
                if (err) console.log("Couldn't find customer address: " + err);
                else {
                    add = data;
                    if(cust.savingsId == "") {
                        console.log("Inside compare.");
                        checkingT.findOne({_id: cust.checkingId}, {_id: 0, __v: 0}, function (err, data) {
                            if (err) console.log("Couldn't find customer checking account info: " + err);
                            else {
                                check = data;
                                branchT.findOne({_id: cust.branchId}, {_id: 0, __v: 0}, function (err, data) {
                                    if (err) {
                                        console.log("Couldn't find customer branch info: " + err);
                                        callback(err);
                                    }
                                    else {
                                        branch = data;
                                        var custInfo = {
                                            firstName: cust.firstName,
                                            lastName: cust.lastName,
                                            id: cust._id,
                                            address: add,
                                            branchInfo: branch,
                                            accountInfo: check,
                                            dateOfCreation: cust.dateOfCreation
                                        }
                                        callback(null, custInfo);
                                    }
                                });
                            }
                        });
                    }

                    else if(cust.checkingId == "") {
                        console.log("Inside compare.");
                        savingsT.findOne({_id: cust.savingsId}, {_id: 0, __v: 0}, function (err, data) {
                            if (err) console.log("Couldn't find customer Savings account info: " + err);
                            else {
                                save = data;
                                branchT.findOne({_id: cust.branchId}, {_id: 0, __v: 0}, function (err, data) {
                                    if (err) {
                                        console.log("Couldn't find customer branch info: " + err);
                                        callback(err);
                                    }
                                    else {
                                        branch = data;
                                        var custInfo = {
                                            firstName: cust.firstName,
                                            lastName: cust.lastName,
                                            id: cust._id,
                                            address: add,
                                            branchInfo: branch,
                                            accountInfo: save,
                                            dateOfCreation: cust.dateOfCreation
                                        }
                                        callback(null, custInfo);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    })
}


module.exports.deleteAccount = function(id, callback) {
    
    customerT.findOne({_id: id}, function(err, data){
        if(err) console.log("Couldn't find the customer info: "+err);
        else {
            console.log("Customer Info Found.");
            var cust = data,
                branch = data.branchId,
                add = data.addressId;

                if(cust.checkingId !== "") {
                    var check = data.checkingId;

                        addressT.findByIdAndRemove({_id: add}, function (err) {
                        if (err) console.log("Couldn't delete Customer Address: " + err);
                        else {
                            console.log("Customer Address Deleted.");
                            branchT.findByIdAndRemove({_id: branch}, function (err) {
                                if (err) console.log("Couldn't delete Customer Branch Info: " + err);
                                else {
                                    console.log("Customer Branch Info Deleted.");
                                    checkingT.findByIdAndRemove({_id: check}, function (err) {
                                        if (err) console.log("Couldn't delete Customer Checking Account: " + err);
                                        else {
                                            console.log("Customer Checking Account Deleted.");
                                            customerT.findByIdAndRemove({_id: id}, function (err) {
                                                if (err) {
                                                    console.log("Couldn't delete Customer Info: " + err);
                                                    callback(err);
                                                }
                                                else {
                                                    console.log("Customer Info Deleted.");
                                                    callback(null);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }

            else if(cust.savingsId !== "") {
                var save = data.savingsId;

                addressT.findByIdAndRemove({_id: add}, function (err) {
                    if (err) console.log("Couldn't delete Customer Address: " + err);
                    else {
                        console.log("Customer Address Deleted.");
                        branchT.findByIdAndRemove({_id: branch}, function (err) {
                            if (err) console.log("Couldn't delete Customer Branch Info: " + err);
                            else {
                                console.log("Customer Branch Info Deleted.");
                                savingsT.findByIdAndRemove({_id: save}, function (err) {
                                    if (err) console.log("Couldn't delete Customer Savings Account: " + err);
                                    else {
                                        console.log("Customer Savings Account Deleted.");
                                        customerT.findByIdAndRemove({_id: id}, function (err) {
                                            if (err) {
                                                console.log("Couldn't delete Customer Info: " + err);
                                                callback(err);
                                            }
                                            else {
                                                console.log("Customer Info Deleted.");
                                                callback(null);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            
        }
    })
}

module.exports.getAllAccounts = function(callback){
    customerT.find({}, function(err, data){
        if(err) callback(err);
        else callback(null, data);
    })
}

module.exports.updateAccount = function(id, updated, callback) {
    var chance = new Chance();
    customerT.findOne({_id: id}, function(err, data){
        if(err) console.log("Couldn't find customer info: "+err);
        else {
            var cust = data,
                check = data.checkingId,
                branch = data.branchId,
                add = data.addressId,
                save = data.savingsId;

                addressT.findOne({_id: add}, function(err, data){
                if(err) console.log("Couldn't find customer address: "+err);
                    else {
                        var aDoc = data.dateOfCreation,
                            addObj = {
                                phone: chance.phone(),
                                _id: data._id,
                                zip: chance.zip(),
                                email: chance.email(),
                                city: chance.city(),
                                street: chance.address()
                            }
                        addressT.findByIdAndUpdate(add, addObj, function(err){
                            if(err) console.log("Couldn't update customer address: "+err);
                            else {
                                branchT.findOne({_id: branch}, function(err, data){
                                    if(err) console.log("Couldn't find customer branch info: "+err);
                                    else {
                                        var bDoc = data.dateOfCreation,
                                            branchObj = {
                                                branchCode: chance.integer({min: 0}),
                                                _id: data._id,
                                                branchLocation: chance.city(),
                                                branchName: updated.branchName,
                                                dateOfCreation: bDoc
                                            }
                                        branchT.findByIdAndUpdate(branch, branchObj, function(err){
                                            if(err) console.log("Couldn't update customer branch info: "+err);
                                            else {
                                                console.log(cust.savingsId == "n/a");
                                                if(cust.savingsId == "") {
                                                    checkingT.findOne({_id: check}, function (err, data) {
                                                        if (err) console.log("Couldn't find customer checking account: " + err);
                                                        else {
                                                            console.log(updated);
                                                            var cDoc = data.dateOfCreation,
                                                                checkingObj = {
                                                                    accountNumber: chance.cc(),
                                                                    _id: data._id,
                                                                    cash: updated.cash,
                                                                    accountType: "Checking",
                                                                    dateOfCreation: cDoc
                                                                }
                                                            checkingT.findByIdAndUpdate(check, checkingObj, function(err) {
                                                                if (err) console.log("Couldn't update customer account info: " + err);
                                                                else {
                                                                    var customerObj = {
                                                                        _id: cust._id,
                                                                        firstName: updated.firstName,
                                                                        lastName: updated.lastName,
                                                                        branchId: cust.branchId,
                                                                        checkingId: cust.checkingId,
                                                                        addressId: cust.addressId
                                                                    }
                                                                    customerT.findByIdAndUpdate(cust._id, customerObj, function (err) {
                                                                        if (err) {
                                                                            console.log("Couldn't Update Customer Info: " + err);
                                                                            callback(err);
                                                                        }
                                                                        else {
                                                                            console.log("Customer Info Updated!");
                                                                            callback(null);
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }

                                                else if(cust.checkingId == "") {
                                                    savingsT.findOne({_id: save}, function (err, data) {
                                                        if (err) console.log("Couldn't find customer savings account: " + err);
                                                        else {
                                                            console.log(updated.accountType);
                                                            var cDoc = data.dateOfCreation,
                                                                savingsObj = {
                                                                    accountNumber: chance.cc(),
                                                                    _id: data._id,
                                                                    cash: updated.cash,
                                                                    accountType: "Savings",
                                                                    dateOfCreation: cDoc
                                                                }
                                                            checkingT.findByIdAndUpdate(save, savingsObj, function (err) {
                                                                if (err) console.log("Couldn't update customer account info: " + err);
                                                                else {
                                                                    var customerObj = {
                                                                        _id: cust._id,
                                                                        firstName: updated.firstName,
                                                                        lastName: updated.lastName,
                                                                        branchId: cust.branchId,
                                                                        checkingId: cust.checkingId,
                                                                        addressId: cust.addressId
                                                                    }
                                                                    customerT.findByIdAndUpdate(cust._id, customerObj, function (err) {
                                                                        if (err) {
                                                                            console.log("Couldn't Update Customer Info: " + err);
                                                                            callback(err);
                                                                        }
                                                                        else {
                                                                            console.log("Customer Info Updated!");
                                                                            callback(null);
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
        }
    })
}

module.exports.depositMoney = function(id, amount, accType, callback){

    var chance = new Chance();
    customerT.findOne({_id: id}, function(err, data){
        if(err) console.log("Couldn't find the Customer: "+err);
        else {
            var cust = data;
            if(accType == "Checking") {
                var check = data.checkingId;
                checkingT.findOne({_id: check}, function (err, data) {
                    if (err) console.log("Couldn't find customer's checking account: "+err);
                    else {
                        var updatedCash = Number(amount)+data.cash;
                        console.log(typeof updatedCash);
                        var checkingObj = {
                            accountNumber: data.accountNumber,
                            _id: data._id,
                            cash: updatedCash,
                            accountType: data.accountType,
                            dateOfCreation: data.dateOfCreation
                        }
                        checkingT.findByIdAndUpdate(data._id, checkingObj, function(err){
                            if(err) console.log("Couldn't update checking account: "+err);
                            else{
                                console.log("Updated Checking Account.");
                                var FullName = cust.firstName+" "+cust.lastName;
                                    var transId = chance.guid();
                                var trans = {
                                    _id: transId,
                                    amount: amount,
                                    transactionType: "deposit",
                                    transactionDate: chance.date({string: true}),
                                    fromId: "",
                                    from: "",
                                    fromAccount: "",
                                    toId: id,
                                    to: FullName,
                                    toAccount: accType

                                }
                                var transaction = new transactionT(trans);
                                transaction.save(function(err) {
                                    if (err) {
                                        console.log("Couldn't save the transaction info: "+err);
                                        callback(err);
                                    }
                                    else {
                                        console.log("Updated transaction info.");
                                        callback(null, transId);
                                    }

                                });
                            }
                        })
                    }

                })
            }

            else if(accType == "Savings") {
                var save = data.savingsId;
                savingsT.findOne({_id: save}, function (err, data) {
                    if (err) console.log("Couldn't find customer's savings account.");
                    else {
                        console.log(data);
                        var updatedCash = data.cash+Number(amount);
                        var savingsObj = {
                            accountNumber: data.accountNumber,
                            _id: data._id,
                            cash: updatedCash,
                            accountType: data.accountType,
                            dateOfCreation: data.dateOfCreation
                        }

                        savingsT.findByIdAndUpdate(data._id, savingsObj, function(err){
                            if(err) console.log("Couldn't Update Savings account: "+err);
                            else{
                                console.log("Updated Savings Account.");
                                var FullName = cust.firstName+" "+cust.lastName;
                                var transId = chance.guid();
                                var trans = {
                                    _id: transId,
                                    amount: amount,
                                    transactionType: "deposit",
                                    transactionDate: chance.date({string: true}),
                                    fromId: "",
                                    from: "",
                                    fromAccount: "",
                                    toId: id,
                                    to: FullName,
                                    toAccount: accType
                                }
                                var transaction = new transactionT(trans);
                                transaction.save(function(err) {
                                    if (err) {
                                        console.log("Couldn't save the transaction info: "+err);
                                        callback(err);
                                    }
                                    else {
                                        console.log("Updated transaction info.");
                                        callback(null, transId);
                                    }

                                });
                            }
                        })
                        
                    }

                })
            }
        }
    });
}

module.exports.withdrawMoney = function(id, amount, accType, callback){
    var chance = new Chance();
    customerT.findOne({_id: id}, function(err, data){
        if(err) console.log("Couldn't find the Customer: "+err);
        else {
            var cust = data;
            if(accType == "Checking") {
                var check = data.checkingId;
                checkingT.findOne({_id: check}, function (err, data) {
                    if (err) console.log("Couldn't find customer's checking account: "+err);
                    else {
                        var updatedCash = data.cash-Number(amount);
                        var checkingObj = {
                            accountNumber: data.accountNumber,
                            _id: data._id,
                            cash: updatedCash,
                            accountType: data.accountType,
                            dateOfCreation: data.dateOfCreation
                        }
                        checkingT.findByIdAndUpdate(data._id, checkingObj, function(err){
                            if(err) console.log("Couldn't update checking account: "+err);
                            else{
                                console.log("Updated Checking Account.");
                                var FullName = cust.firstName+" "+cust.lastName;
                                var transId = chance.guid();
                                var trans = {
                                    _id: transId,
                                    amount: amount,
                                    transactionType: "withdrawal",
                                    transactionDate: chance.date({string: true}),
                                    fromId: id,
                                    from: FullName,
                                    fromAccount: accType,
                                    toId: "",
                                    to: "",
                                    toAccount: ""
                                }
                                var transaction = new transactionT(trans);
                                transaction.save(function(err) {
                                    if (err) {
                                        console.log("Couldn't save the transaction info: "+err);
                                        callback(err);
                                    }
                                    else {
                                        console.log("Updated transaction info.");
                                        callback(null, transId);
                                    }

                                });

                            }
                        })
                    }

                })
            }

            else if(accType == "Savings") {
                var save = data.savingsId;
                savingsT.findOne({_id: save}, function (err, data) {
                    if (err) console.log("Couldn't find customer's savings account.");
                    else {
                        console.log(data);
                        var updatedCash = data.cash-Number(amount);
                        var savingsObj = {
                            accountNumber: data.accountNumber,
                            _id: data._id,
                            cash: updatedCash,
                            accountType: data.accountType,
                            dateOfCreation: data.dateOfCreation
                        }
                        savingsT.findByIdAndUpdate(data._id, savingsObj, function(err){
                            if(err) console.log("Couldn't Update Savings account: "+err);
                            else{
                                console.log("Updated Savings Account.");
                                var FullName = cust.firstName+" "+cust.lastName;
                                var transId = chance.guid();
                                var trans = {
                                    _id: transId,
                                    amount: amount,
                                    transactionType: "withdrawal",
                                    transactionDate: chance.date({string: true}),
                                    fromId: id,
                                    from: FullName,
                                    fromAccount: accType,
                                    toId: "",
                                    to: "",
                                    toAccount: ""
                                }
                                var transaction = new transactionT(trans);
                                transaction.save(function(err) {
                                    if (err) {
                                        console.log("Couldn't save the transaction info: "+err);
                                        callback(err);
                                    }
                                    else {
                                        console.log("Updated transaction info.");
                                        callback(null, transId);
                                    }

                                });
                            }
                        })

                    }

                })
            }
        }
    });
}

module.exports.transferMoney = function(sendId, recId, amount, sAccType, rAccType, callback){

    var chance = new Chance();
    customerT.findOne({_id: sendId}, function(err, data){
        if(err) console.log("Couldn't find the sender: "+err);
        else {
            var sender = data;
            if(sAccType == "Checking"){
                checkingT.findOne({_id: data.checkingId}, function(err, data){
                    if(err) console.log("Couldn't find sender's checking account: "+err);
                    else {
                        if(Number(amount)<data.cash){
                            var updatedCash = data.cash-Number(amount);
                            var checkingObj = {
                                accountNumber: data.accountNumber,
                                _id: data._id,
                                cash: updatedCash,
                                accountType: data.accountType,
                                dateOfCreation: data.dateOfCreation
                            }
                            checkingT.findByIdAndUpdate(data._id, checkingObj, function(err){
                                if(err) {
                                    console.log("Couldn't update sender's checking account: "+err);
                                }
                                else{
                                    console.log("Updated Sender's Checking Account.");
                                    customerT.findOne({_id:recId}, function(err, data){
                                        if(err) console.log("Couldn't find the recipient: "+err);
                                        else {
                                            if(rAccType == "Checking"){

                                                var check = data.checkingId;
                                                checkingT.findOne({_id: check}, function (err, data) {
                                                    if (err) console.log("Couldn't find recipient's checking account: "+err);
                                                    else {
                                                        var updatedCash = data.cash+Number(amount);
                                                        var checkingObj = {
                                                            accountNumber: data.accountNumber,
                                                            _id: data._id,
                                                            cash: updatedCash,
                                                            accountType: data.accountType,
                                                            dateOfCreation: data.dateOfCreation
                                                        }
                                                        checkingT.findByIdAndUpdate(data._id, checkingObj, function(err){
                                                            if(err) console.log("Couldn't update checking account: "+err);
                                                            else{
                                                                console.log("Updated Checking Account.");
                                                                customerT.findOne({_id:recId}, function(err, data){
                                                                    if(err) console.log("Couldn't find receiver info: "+err);
                                                                    else {
                                                                        var sFullName = sender.firstName+" "+sender.lastName;
                                                                        var rFullName = data.firstName+" "+data.lastName;
                                                                        var transId = chance.guid();
                                                                        var trans = {
                                                                            _id: transId,
                                                                            amount: amount,
                                                                            transactionType: "moneyTransfer",
                                                                            transactionDate: chance.date({string: true}),
                                                                            fromId: sendId,
                                                                            from: sFullName,
                                                                            fromAccount: sAccType,
                                                                            toId: recId,
                                                                            to: rFullName,
                                                                            toAccount: rAccType
                                                                        }
                                                                        var transaction = new transactionT(trans);
                                                                        transaction.save(function(err) {
                                                                            if (err) {
                                                                                console.log("Couldn't save the transaction info: "+err);
                                                                                callback(err);
                                                                            }
                                                                            else {
                                                                                console.log("Updated transaction info.");
                                                                                callback(null, transId);
                                                                            }

                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        })
                                                    }

                                                })

                                            }

                                            else if(rAccType == "Savings") {

                                                var save = data.savingsId;
                                                savingsT.findOne({_id: save}, function (err, data) {
                                                    if (err) console.log("Couldn't find recipient's savings account: "+err);
                                                    else {
                                                        console.log(data);
                                                        var updatedCash = data.cash+Number(amount);
                                                        var savingsObj = {
                                                            accountNumber: data.accountNumber,
                                                            _id: data._id,
                                                            cash: updatedCash,
                                                            accountType: data.accountType,
                                                            dateOfCreation: data.dateOfCreation
                                                        }

                                                        savingsT.findByIdAndUpdate(data._id, savingsObj, function(err){
                                                            if(err) console.log("Couldn't Update Savings account: "+err);
                                                            else{
                                                                console.log("Updated Savings Account.");
                                                                customerT.findOne({_id:recId}, function(err, data){
                                                                    if(err) console.log("Couldn't find receiver info: "+err);
                                                                    else {
                                                                        var sFullName = sender.firstName+" "+sender.lastName;
                                                                        var rFullName = data.firstName+" "+data.lastName;
                                                                        var transId = chance.guid();
                                                                        var trans = {
                                                                            _id: transId,
                                                                            amount: amount,
                                                                            transactionType: "moneyTransfer",
                                                                            transactionDate: chance.date({string: true}),
                                                                            fromId: sendId,
                                                                            from: sFullName,
                                                                            fromAccount: sAccType,
                                                                            toId: recId,
                                                                            to: rFullName,
                                                                            toAccount: rAccType
                                                                        }
                                                                        var transaction = new transactionT(trans);
                                                                        transaction.save(function(err) {
                                                                            if (err) {
                                                                                console.log("Couldn't save the transaction info: "+err);
                                                                                callback(err);
                                                                            }
                                                                            else {
                                                                                console.log("Updated transaction info.");
                                                                                callback(null, transId);
                                                                            }

                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        })

                                                    }

                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }

                        else {
                            console.log("Sender ran out of Money in the bank!");
                            callback(true);
                        }
                    }
                })
            }
            
            else if(sAccType == "Savings"){

                savingsT.findOne({_id: data.savingsId}, function(err, data){
                    if(err) console.log("Couldn't find sender's savings account: "+err);
                    else {
                        if(Number(amount)<data.cash){
                            var updatedCash = data.cash-Number(amount);
                            var savingsObj = {
                                accountNumber: data.accountNumber,
                                _id: data._id,
                                cash: updatedCash,
                                accountType: data.accountType,
                                dateOfCreation: data.dateOfCreation
                            }
                            savingsT.findByIdAndUpdate(data._id, savingsObj, function(err){
                                if(err) {
                                    console.log("Couldn't update sender's savings account: "+err);
                                }
                                else{
                                    console.log("Updated Sender's Savings Account.");
                                    customerT.findOne({_id:recId}, function(err, data){
                                        if(err) console.log("Couldn't find the recipient: "+err);
                                        else {
                                            if(rAccType == "Checking"){

                                                var check = data.checkingId;
                                                checkingT.findOne({_id: check}, function (err, data) {
                                                    if (err) console.log("Couldn't find recipient's checking account: "+err);
                                                    else {
                                                        var updatedCash = data.cash+Number(amount);
                                                        var checkingObj = {
                                                            accountNumber: data.accountNumber,
                                                            _id: data._id,
                                                            cash: updatedCash,
                                                            accountType: data.accountType,
                                                            dateOfCreation: data.dateOfCreation
                                                        }
                                                        checkingT.findByIdAndUpdate(data._id, checkingObj, function(err){
                                                            if(err) console.log("Couldn't update checking account: "+err);
                                                            else{
                                                                console.log("Updated Checking Account.");
                                                                customerT.findOne({_id:recId}, function(err, data){
                                                                    if(err) console.log("Couldn't find receiver info: "+err);
                                                                    else {
                                                                        var sFullName = sender.firstName+" "+sender.lastName;
                                                                        var rFullName = data.firstName+" "+data.lastName;
                                                                        var transId = chance.guid();
                                                                        var trans = {
                                                                            _id: transId,
                                                                            amount: amount,
                                                                            transactionType: "moneyTransfer",
                                                                            transactionDate: chance.date({string: true}),
                                                                            fromId: sendId,
                                                                            from: sFullName,
                                                                            fromAccount: sAccType,
                                                                            toId: recId,
                                                                            to: rFullName,
                                                                            toAccount: rAccType
                                                                        }
                                                                        var transaction = new transactionT(trans);
                                                                        transaction.save(function(err) {
                                                                            if (err) {
                                                                                console.log("Couldn't save the transaction info: "+err);
                                                                                callback(err);
                                                                            }
                                                                            else {
                                                                                console.log("Updated transaction info.");
                                                                                callback(null, transId);
                                                                            }

                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        })
                                                    }

                                                })

                                            }

                                            else if(rAccType == "Savings") {

                                                var save = data.checkingId;
                                                savingsT.findOne({_id: save}, function (err, data) {
                                                    if (err) console.log("Couldn't find recipient's savings account.");
                                                    else {
                                                        console.log(data);
                                                        var updatedCash = data.cash+Number(amount);
                                                        var savingsObj = {
                                                            accountNumber: data.accountNumber,
                                                            _id: data._id,
                                                            cash: updatedCash,
                                                            accountType: data.accountType,
                                                            dateOfCreation: data.dateOfCreation
                                                        }

                                                        savingsT.findByIdAndUpdate(data._id, savingsObj, function(err){
                                                            if(err) console.log("Couldn't Update Savings account: "+err);
                                                            else{
                                                                console.log("Updated Savings Account.");
                                                                customerT.findOne({_id:recId}, function(err, data){
                                                                    if(err) console.log("Couldn't find receiver info: "+err);
                                                                    else {
                                                                        var sFullName = sender.firstName+" "+sender.lastName;
                                                                        var rFullName = data.firstName+" "+data.lastName;
                                                                        var transId = chance.guid();
                                                                        var trans = {
                                                                            _id: transId,
                                                                            amount: amount,
                                                                            transactionType: "moneyTransfer",
                                                                            transactionDate: chance.date({string: true}),
                                                                            fromId: sendId,
                                                                            from: sFullName,
                                                                            fromAccount: sAccType,
                                                                            toId: recId,
                                                                            to: rFullName,
                                                                            toAccount: rAccType
                                                                        }
                                                                        var transaction = new transactionT(trans);
                                                                        transaction.save(function(err) {
                                                                            if (err) {
                                                                                console.log("Couldn't save the transaction info: "+err);
                                                                                callback(err);
                                                                            }
                                                                            else {
                                                                                console.log("Updated transaction info.");
                                                                                callback(null, transId);
                                                                            }

                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        })

                                                    }

                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            console.log("Sender ran out of Money in the bank!");
                            callback(err);
                        }
                    }
                })
            }
        }
    });
}

module.exports.getAllCustomers = function(callback){
    customerT.find({}, {__v:0}, function(err, data){
        if(!data){
            console.log("Data not found!");
            callback(true);
        }
        else{
            console.log(data);
            callback(null, data);
        }
    })
}

module.exports.login = function(uname, pass, callback){
    console.log(uname);
    console.log(pass);
    customerT.findOne({userName: uname, password: pass}, function(err, data){
        if(!data){
            console.log("User Not Found!!");
            callback(true);
        }
        else {
            console.log("User Found");
            callback(null, data);
        }
    })
}