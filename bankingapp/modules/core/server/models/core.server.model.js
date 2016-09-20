/**
 * Created by MrKK on 9/1/16.
 */
'use strict';

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


var accSchema = new Schema({

    firstName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'FirstName cannot be empty!'],
    },

    lastName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'lastName cannot be empty!']
    },

    email: {
        type: String,
        default: '',
        trim: true,
        //unique: true,
        lowercase: true,
        validate: [validateEmailStrategy, 'Please enter valid email id.']
    },

    zip: {

        type: String,
        default: '',
        trim: true,
        validate: [validateZipStrategy, 'zip cannot be empty!']

    },

    address: {

        type: String,
        default: '',
        validate: [validateFieldStrategy, "Address cannot be empty!"]
    },

    phone: {
        type: String,
        trim: true,
        unique: true,
        default: '',
        validate: [validatePhoneStrategy, "Phone number is invalid!"]
    },

    city: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "City cannot be empty!"]
    },

    cash: {
        type: Number,
        trim: true,
        default: 0,
        validate: [validateFieldStrategy, validateCurrencyStrategy, "Cash cannot be Empty", "Cash must be currency"]
    },

    accountNumber: {
        type: String,
        trim: true,
        default: 0,
        validate: [validateFieldStrategy, "Account Number cannot be Empty"]
    }
});



mongoose.model("Accounts", accSchema);