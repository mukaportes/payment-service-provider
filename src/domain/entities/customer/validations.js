const Joi = require('joi');

const create = Joi.object().keys({
  birthday: Joi.date().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
}).required();

module.exports = { create };