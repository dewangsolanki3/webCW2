const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(value) {
  let errors = {};

  value.school = !isEmpty(value.school) ? value.school : '';
  value.degree = !isEmpty(value.degree) ? value.degree : '';
  value.fieldofstudy = !isEmpty(value.fieldofstudy) ? value.fieldofstudy : '';
  value.from = !isEmpty(value.from) ? value.from : '';

  if (Validator.isEmpty(value.school)) {
    errors.school = 'field is required';
  }

  if (Validator.isEmpty(value.degree)) {
    errors.degree = 'field is required';
  }

  if (Validator.isEmpty(value.fieldofstudy)) {
    errors.fieldofstudy = 'field is required';
  }

  if (Validator.isEmpty(value.from)) {
    errors.from = 'field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};