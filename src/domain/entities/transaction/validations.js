const Joi = require('joi');

const create = Joi.object().keys({
  amount: Joi.number().required(),
  // TODO: check if there is a better way to validate if cardNumber has at least four digits
  cardCvv: Joi.number().min(1000).required(),
  cardExpirationDate: Joi.date().required(),
  cardHolderName: Joi.string().required(),
  cardNumber: Joi.number().required(),
  customerUid: Joi.string().uuid().required(),
  description: Joi.string().required(),
  paymentMethod: Joi.number().required(),
}).required();

module.exports = { create };