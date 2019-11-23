const uuid = require('uuid/v4');
const validate = require('../../../helpers/validator');
const customerValidations = require('./validations');

module.exports = function(customer) {
  this.validateNewCustomer = function() {
    return validate(customer, customerValidations.create);
  };

  this.getNewCustomer = function() {
    return {
      ...customer,
      createdAt: new Date().toISOString(),
      createdBy: customer.name,
      customerUid: uuid(),
    };
  };
};
