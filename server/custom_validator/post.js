const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(value) {
  let errors = {};

  value.text = !isEmpty(value.text) ? value.text : '';

  if (!Validator.isLength(value.text, { min: 10, max: 300 })) {
    errors.text = 'Value must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(value.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};