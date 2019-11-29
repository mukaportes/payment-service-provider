const models = require('../../../db/models');
const GetAllTransactionService = require('../../../domain/services/transaction/get-all');

module.exports = (_, res) => {
  const service = new GetAllTransactionService({
    customerModel: models.customer,
    payableModel: models.payable,
    transactionModel: models.transaction,
  });

  return service.execute()
    .then(({ output, status }) => res.status(status).json(output));
};