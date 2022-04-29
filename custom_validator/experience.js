const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(value) {
  let errors = {};

  value.title = !isEmpty(value.title) ? value.title : '';
  value.company = !isEmpty(value.company) ? value.company : '';
  value.from = !isEmpty(value.from) ? value.from : '';

  if (Validator.isEmpty(value.title)) {
    errors.title = 'field is required';
  }

  if (Validator.isEmpty(value.company)) {
    errors.company = 'field is required';
  }

  if (Validator.isEmpty(value.from)) {
    errors.from = 'Field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};