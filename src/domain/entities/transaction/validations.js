const Joi = require('joi');

const create = Joi.object().keys({
  amount: Joi.number().required(),
  cardCvv: Joi.number().required(),
  cardExpirationDate: Joi.date().required(),
  cardHolderName: Joi.string().required(),
  cardNumber: Joi.number().required(),
  customerUid: Joi.string().uuid().required(),
  description: Joi.string().required(),
  paymentMethod: Joi.number().required(),
}).required();

module.exports = { create };