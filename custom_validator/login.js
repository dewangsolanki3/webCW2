const Validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(value){
    let errors = {}

    value.email = !isEmpty(value.email) ? value.email: '';
    value.password = !isEmpty(value.password) ? value.password: '';

    if(Validator.isEmpty(value.email)){
        errors.email = 'email field is required'
    }

    if(!Validator.isEmail(value.email)){
        errors.email = 'Email is invalid'
    }

    if(Validator.isEmpty(value.password)){
        errors.password = 'Password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}