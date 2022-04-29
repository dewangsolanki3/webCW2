const Validator = require('validator')
const isEmpty = require('./is-empty');
const { default: validator } = require('validator');

module.exports = function validateRegesterInput(value){
    let errors = {}

    value.name = !isEmpty(value.name) ? value.name: '';
    value.email = !isEmpty(value.email) ? value.email: '';
    value.password = !isEmpty(value.password) ? value.password: '';
    value.password2 = !isEmpty(value.password2) ? value.password2: '';

    if(!Validator.isLength(value.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(validator.isEmpty(value.name)){
        errors.name = 'Name field is required'
    }

    if(validator.isEmpty(value.email)){
        errors.email = 'email field is required'
    }

    if(!validator.isEmail(value.email)){
        errors.email = 'Email is invalid'
    }

    if(validator.isEmpty(value.password)){
        errors.password = 'Password field is required'
    }

    if(!validator.isLength(value.password,{ min: 6, max: 30})){
        errors.password = 'Password must be at least 6 characters'
    }

    if(validator.isEmpty(value.password2)){
        errors.password2 = 'Confirm password field is required'
    }

    if(!validator.equals(value.password, value.password2)){
        errors.password2 = 'Passwords must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}