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
    console.log(validator.isDate(property));
    return validator.isDate(property);
}

var checkingSchema = new Schema({

    accountType: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'FirstName cannot be empty!'],
    },

    dateOfCreation: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "Date cannot be empty!"]
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


mongoose.model('CheckingTable', checkingSchema);