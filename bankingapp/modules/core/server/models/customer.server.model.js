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

var customerSchema = new Schema({

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

    dateOfCreation: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "Date cannot be empty!"]
    },

    /*userName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateFieldStrategy, "userName cannot be empty!"]
    },

    password: {
        type: String,
        trim: true,
        default: '',
        validate: [validateFieldStrategy, "password cannot be empty!"]
    },*/

    _id: {
        type: String,
        default: ' ',
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateFieldStrategy, 'Please enter valid id.']
    },

    checkingId: {
        type: String,
        default: ' ',
        trim: true
    },

    savingsId: {

        type: String,
        default: ' ',
        trim: true

    },

    addressId: {

        type: String,
        default: '',
        unique: true,
        validate: [validateFieldStrategy, "addressId cannot be empty!"]
    },

    branchId: {

        type: String,
        default: '',
        unique: true,
        validate: [validateFieldStrategy, "branchId cannot be empty!"]
    }
});

mongoose.model('CustomerTable', customerSchema);