const Joi = require('joi');

const create = Joi.object().keys({
  amount: Joi.number().required(),
  cardCvv: Joi.number().required(),
  cardExpirationDate: Joi.date().required(),
  cardHolderName: Joi.string().required(),
  cardNumber: Joi.string().creditCard(),
  customerUid: Joi.string().uuid().required(),
  description: Joi.string().required(),
  paymentMethod: Joi.string().required(),
}).required();

module.exports = { create };