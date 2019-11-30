const httpResponse = require('../../../helpers/http-response');
const MESSAGES = require('../../messages');

module.exports = function ({
  PayableEntity, TransactionEntity, payableModel, transactionModel,
}) {
  this.execute = function (input) {
    const transactionEntityInstance = new TransactionEntity(input);
    const payableEntityInstance = new PayableEntity(input);

    const { isValid, validationErrors } = transactionEntityInstance.validateNewTransaction();

    if (!isValid) {
      return httpResponse.badRequest({ errors: validationErrors });
    }

    const newTransaction = {
      ...transactionEntityInstance.getNewTransaction(),
      payable: payableEntityInstance.getNewPayable(),
    };

    return transactionModel.create(newTransaction, {
      include: [{ as: 'payable', model: payableModel }],
    })
      .then(() => httpResponse.success(MESSAGES.transaction.create.success))
      .catch((error) => httpResponse.unprocessableEntity({
        error: error.message,
        stack: error.stack,
      }));
  };
};