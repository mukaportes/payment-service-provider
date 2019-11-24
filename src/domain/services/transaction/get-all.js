const httpResponse = require('../../../helpers/http-response');

module.exports = function ({ customerModel, payableModel, transactionModel }) {
  this.execute = function () {
  // this.execute = function (filters) {
    // TODO: add filters validation

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