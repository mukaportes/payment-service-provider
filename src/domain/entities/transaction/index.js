const uuid = require('uuid/v4');
const validate = require('../../../helpers/validator');
const transactionValidations = require('./validations');

module.exports = function(transaction) {
  this.validateNewCustomer = function() {
    return validate(transaction, transactionValidations.create);
  };

  // TODO: review this logic below
  this.sanitizeCardNumber = function() {
    const cardNumberToString = transaction.cardNumber.toString();
    const cardNumberLength = cardNumberToString.length - 1;
    let sanitizedCardNumber = '';

    for (let counter = cardNumberLength; counter <= (cardNumberLength - 3); counter += 1) {
      sanitizedCardNumber += cardNumberToString[counter]; 
    }

    return Number(sanitizedCardNumber);
  };

  this.getNewTransaction = function(payable) {
    return {
      ...transaction,
      createdAt: new Date().toISOString(),
      createdBy: transaction.customerUid,
      payable,
      transactionUid: uuid(),
    };
  };
};
