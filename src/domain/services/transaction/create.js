const httpResponse = require('../../../helpers/http-response');
const MESSAGES = require('../../messages');

module.exports = function ({
  PayableEntity, TransactionEntity, payableModel, transactionModel,
}) {
  this.execute = function (input) {
    const transactionEntityInstance = new TransactionEntity(input);
    const payableEntityInstance = new PayableEntity(input);

    const transactionValidation = transactionEntityInstance.validateNewTransaction();

    if (!transactionValidation.isValid) {
      return httpResponse.badRequest({ errors: transactionValidation });
    }

    const newTransaction = {
      ...transactionEntityInstance.getNewTransaction(),
      payable: payableEntityInstance.getNewPayable(),
    };

    return transactionModel.create(newTransaction, {
      include: [{ as: 'payable', model: payableModel }],
    })
      .then((transaction) => httpResponse.success({
        ...MESSAGES.transaction.create.success,
        transaction,
      }))
      .catch((error) => httpResponse.unprocessableEntity({
        error: error.message,
        stack: error.stack,
      }));
  };
};