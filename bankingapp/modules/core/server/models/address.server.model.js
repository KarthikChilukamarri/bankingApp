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

/*var validatePhoneStrategy = function (property) {

    return /\d{3}-\d{3}-\d{4}/.test(property);
}*/

var validateDateStrategy = function(property) {
    return validator.isDate(property);
}

var addressSchema = new Schema({

    street: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'Street cannot be empty!'],
    },

    dateOfCreation: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "Date cannot be empty!"]
    },

    city: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'City cannot be empty!']
    },

    email: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmailStrategy, 'Please enter valid email id.']
    },

    zip: {

        type: String,
        default: '',
        trim: true,
        validate: [validateZipStrategy, 'zip cannot be empty!']

    },

    phone: {
        type: String,
        trim: true,
        unique: true,
        default: '',
        validate: [validateFieldStrategy, "Phone number is invalid!"]
    }
});

mongoose.model('AddressTable', addressSchema);