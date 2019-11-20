const Joi = require('joi');

/**
 * @description Validates an input using a Joi schema
 * @param {any} input Input data to be validated 
 * @param {JoiSchema} schema Joi schema for the input data to be
 * validated upon
 * @returns {object} Object containing props isValid <Boolean>
 * and validationErrors <Array>
 */
module.exports = (input, schema) => {
  const validation = Joi.validate(input, schema, { allowUnknown: true });

  const isValid = validation !== null;
  const validationErrors = isValid ? [] : validation.error.details;

  return { isValid, validationErrors };
};