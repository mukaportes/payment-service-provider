const uuid = require('uuid/v4');
const PAYMENT_METHODS = require('../../../enums/payment-methods');

// eslint-disable-next-line max-lines-per-function 
module.exports = function (transaction) {
  this.validate = function () {
    const errors = [];

    if (!PAYMENT_METHODS.toStatus[transaction.paymentMethod]) {
      errors.push({ message: 'Invalid payment method' });
    }

    return errors;
  };

  this.getStatus = function () {
    return PAYMENT_METHODS.toStatus[transaction.paymentMethod];
  };

  this.getCreationDate = function () {
    const currentDate = new Date();
    const status = this.getStatus();

    if (status === PAYMENT_METHODS.toStatus.credit_card) {
      const daysToAdd = 30;
      currentDate.setDate(currentDate.getDate() + daysToAdd);
    }

    return currentDate.toISOString();
  };

  this.getFeeAndAmount = function () {
    const status = this.getStatus();
    const creditCardPercentual = 5;
    const debitCardPercentual = 3;
    const feePercentual = status === PAYMENT_METHODS.toStatus.credit_card
      ? creditCardPercentual : debitCardPercentual;

    return {
      amount: transaction.amount * (1 - (feePercentual * 0.01)),
      fee: transaction.amount * (feePercentual * 0.01),
    };
  };

  this.getNewPayable = function () {
    return {
      createdAt: new Date().toISOString(),
      createdBy: transaction.customerUid,
      payableUid: uuid(),
      paymentDate: this.getCreationDate(),
      status: this.getStatus(),
      ...this.getFeeAndAmount(),
    };
  };
};
