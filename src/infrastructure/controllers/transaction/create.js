const TransactionEntity = require('../../../domain/entities/transaction');
const PayableEntity = require('../../../domain/entities/payable');
const models = require('../../../db/models');
const TransactionCreateService = require('../../../domain/services/transaction/create');

module.exports = (req, res) => {
  const service = new TransactionCreateService({
    PayableEntity,
    TransactionEntity,
    payableModel: models.payable,
    transactionModel: models.transaction,
  });
  const {
    amount, cardCvv, cardExpirationDate, cardHolderName,
    cardNumber, customerUid, description, paymentMethod,
  } = req.body;

  return service.execute({
    amount, cardCvv, cardExpirationDate, cardHolderName,
    cardNumber, customerUid, description, paymentMethod,
  }).then(({ output, status }) => res.status(status).json(output));
};