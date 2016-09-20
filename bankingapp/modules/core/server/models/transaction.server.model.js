/**
 * Created by MrKK on 9/2/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var validateFieldStrategy = function (property) {

    return property.length;
}

var validateEmailStrategy = function (property) {

    return validator.isEmail(property);
}

var validateCurrencyStrategy = function(property){
    return validator.isCurrency(property, options);
}

var validateZipStrategy = function (property) {

    if (validator.isLength(property, {min: 5, max: 5})) {
        validator.isInt(property);
    } else return false;
}

var validatePhoneStrategy = function (property) {

    return /\d{3}-\d{3}-\d{4}/.test(property);
}

var validateDateStrategy = function(property) {
    return validator.isDate(property);
}

var transactionSchema = new Schema({

    _id: {
        type: String,
        trim: true,
        default: '',
        validate: [validateFieldStrategy, "Date cannot be empty!"]
    },

    from: {
        type: String,
        default: '',
        trim: true
    },

    fromId: {
        type: String,
        default: '',
        trim: true
    },
    
    fromAccount: {
        type: String,
        default: '',
        trim: true
    },

    toId: {
        type: String,
        default: '',
        trim: true
    },

    to: {
        type: String,
        default: '',
        trim: true
    },

    toAccount: {
        type: String,
        default: '',
        trim: true
    },

    transactionDate: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "Date cannot be empty!"]
    },

    amount: {
        type: Number,
        trim: true,
        default: 0,
        validate: [validateFieldStrategy, validateCurrencyStrategy, "Cash cannot be Empty", "Cash must be currency"]
    },

    transactionType: {
        type: String,
        trim: true,
        default: 0,
        validate: [validateFieldStrategy, "Account Number cannot be Empty"]
    }

});


mongoose.model('TransactionTable', transactionSchema);
