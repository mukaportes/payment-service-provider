const httpResponse = require('../../../helpers/http-response');

module.exports = function ({
  PayableEntity, TransactionEntity, transactionModel,
}) {
  this.execute = function(input) {
    const transactionEntityInstance = new TransactionEntity(input);
    const payableEntityInstance = new PayableEntity(input);

    const transactionValidation = transactionEntityInstance.validate();

    if (!transactionValidation.isValid) {
      return httpResponse.badRequest({ errors: transactionValidation });
    }

    const newTransaction = {
      ...transactionEntityInstance.getNewTransaction(),
      payable: payableEntityInstance.getNewPayable(),
    };

    return transactionModel.create(newTransaction)
      // TODO: add sys messages to response
      .then((transaction) => httpResponse.success({
        data: 'Transaction successfully created',
        transaction,
      }))
      .catch((error) => httpResponse.unprocessableEntity({
        error: error.message,
        stack: error.stack,
      }));
  };
};