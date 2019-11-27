const uuid = require('uuid/v4');
const validate = require('../../../helpers/validator');
const transactionValidations = require('./validations');
const PAYMENT_METHODS = require('../../../enums/payment-methods');

module.exports = function(transaction) {
  this.isCardExpired = function() {
    return new Date(transaction.cardExpirationDate) < new Date();
  };

  this.validateNewTransaction = function() {
    if (this.isCardExpired()) {
      return { isValid: false, validationErrors: [{ message: 'The given card is expired' }] };
    }
    
    return validate(transaction, transactionValidations.create);
  };

  // TODO: review this logic below
  this.getSanitizedCardNumber = function() {
    const cardNumberToString = transaction.cardNumber.toString();
    const cardNumberLength = cardNumberToString.length - 1;
    let sanitizedCardNumber = '';

    for (let counter = cardNumberLength; counter >= (cardNumberLength - 3); counter -= 1) {
      sanitizedCardNumber = cardNumberToString[counter] + sanitizedCardNumber; 
    }

    return Number(sanitizedCardNumber);
  };

  this.getNewTransaction = function(payable) {
    return {
      ...transaction,
      cardNumber: this.getSanitizedCardNumber(),
      createdAt: new Date().toISOString(),
      createdBy: transaction.customerUid,
      payable,
      paymentMethod: PAYMENT_METHODS.toNumber[transaction.paymentMethod],
      transactionUid: uuid(),
    };
  };
};
