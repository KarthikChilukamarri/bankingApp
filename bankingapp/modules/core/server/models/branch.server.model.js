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


var branchSchema = new Schema({

    branchName: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'branchName cannot be empty!'],
    },

    branchLocation: {

        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'branchLocation cannot be empty!']

    },
    
    dateOfCreation: {
        type: String,
        trim: true,
        default: '',
        uppercase: true,
        validate: [validateFieldStrategy, "Date cannot be empty!"]
    },
    
    
    branchCode: {
        type: String,
        default: '',
        trim: true,
        validate: [validateFieldStrategy, 'branchCode cannot be empty!']
    }
    
});

mongoose.model('BranchTable', branchSchema);