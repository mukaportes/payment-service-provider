const httpResponse = require('../../../helpers/http-response');

module.exports = function ({ customerModel, payableModel, transactionModel }) {
  this.execute = function () {
    return transactionModel.findAll({
      include: [
        { as: 'customer', model: customerModel },
        { as: 'payable', model: payableModel },
      ],
    })
      .then(transactions => httpResponse.success({ transactions }))
      .catch(error => httpResponse
        .unprocessableEntity({ error: error.message, stack: error.stack }));
  };
};