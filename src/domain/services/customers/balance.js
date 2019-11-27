const httpResponse = require('../../../helpers/http-response');
const { getArraySum } = require('../../../helpers/utils');
const PAYABLE_STATUS = require('../../../enums/payable-status');
const MESSAGES = require('../../messages');

module.exports = function ({ payableModel, transactionModel }) {
  const getCustomerBalance = (transactions) => {
    const paid = [];
    const waitingFunds = [];

    transactions.forEach((transaction) => {
      if (transaction.payable) {
        const { amount, status } = transaction.payable;

        if (status === PAYABLE_STATUS.paid) paid.push(amount);
        if (status === PAYABLE_STATUS.waitingFunds) waitingFunds.push(amount);
      }
    });

    return { paid: getArraySum(paid), waitingFunds: getArraySum(waitingFunds) };
  };

  this.execute = function (customerUid) {
    if (!customerUid) {
      return httpResponse.badRequest(MESSAGES.customers.balance.requiredCostumerUid);
    }

    return transactionModel.findAll({
      include: [{ as: 'payable', model: payableModel }],
      where: { customerUid },
    },
    )
      .then((transactions) => {
        const customerBalance = getCustomerBalance(transactions);

        return httpResponse.success(customerBalance);
      })
      .catch(error => httpResponse.unprocessableEntity({
        error: error.message, stack: error.stack,
      }));
  };
};
