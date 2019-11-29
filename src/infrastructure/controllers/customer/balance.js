const models = require('../../../db/models');
const CustomerBalanceService = require('../../../domain/services/customers/balance');

module.exports = (req, res) => {
  const { params: { customerUid } } = req;
  const service = new CustomerBalanceService({
    payableModel: models.payable,
    transactionModel: models.transaction,
  });

  return service.execute(customerUid)
    .then(({ output, status }) => res.status(status).json(output))
    .catch(({ output, status }) => res.status(status).json(output));
};