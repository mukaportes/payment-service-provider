const httpResponse = require('../../../helpers/http-response');

module.exports = function(CustomerEntity, customerModel) {
  this.execute = (input) => {
    const customerEntityInstance = new CustomerEntity(input);
    const { isValid, validationErrors } = customerEntityInstance.validateNewCustomer(input);

    if (!isValid) return httpResponse.badRequest({ errors: validationErrors });

    const newCustomer = customerEntityInstance.getNewCustomer();

    return customerModel.create(newCustomer)
      .then(() => httpResponse.success({ data: 'Customer successfully created' }))
      .catch((error) => httpResponse.unprocessableEntity({
        error: error.message,
        stack: error.stack,
      }));
  };
};
