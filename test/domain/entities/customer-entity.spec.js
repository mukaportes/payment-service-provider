const { assert } = require('chai');
const CustomerEntity = require('../../../src/domain/entities/customer');
const { newCustomerMock } = require('../../mocks/customer');

describe('Customer Entity Tests', () => {
  describe('validateNewCustomer()', () => {
    it('returns isValid true and no errors when entity input is valid', () => {
      const entity = new CustomerEntity(newCustomerMock);
      const { isValid, validationErrors } = entity.validateNewCustomer();

      assert.deepStrictEqual(isValid, true);
      assert.deepStrictEqual(validationErrors, []);
    });
    it('returns isValid false and validation errors when entity input is not valid', () => {
      const entity = new CustomerEntity();
      const { isValid, validationErrors } = entity.validateNewCustomer();

      assert.deepStrictEqual(isValid, false);
      assert.deepStrictEqual(validationErrors.length > 0, true);
    });
  });
  describe('getNewCustomer()', () => {
    it('returns isValid true and no errors when entity input is valid', () => {
      const entity = new CustomerEntity(newCustomerMock);
      const { createdAt, createdBy, customerUid, ...newCustomer } = entity.getNewCustomer();

      assert.deepStrictEqual(newCustomer, newCustomerMock);
      assert.deepStrictEqual(createdBy, newCustomerMock.name);
      assert.deepStrictEqual(new Date(createdAt).toDateString(), new Date().toDateString());
      assert.deepEqual(!!customerUid, true);
    });
  });
});