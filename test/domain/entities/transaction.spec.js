/* eslint-disable */
const { assert } = require('chai');
const faker = require('faker');
const TransactionEntity = require('../../../src/domain/entities/transaction');
const { newTransactionMock } = require('../../mocks/transaction');
const MESSAGES = require('../../../src/domain/messages');

describe('Transaction Entity Tests', () => {
  describe('validate()', () => {
    it('returns empty errors array when the input is valid and card is not expired', () => {
      const entity = new TransactionEntity(newTransactionMock);

      const { isValid, validationErrors } = entity.validateNewTransaction();
      console.log('validationErrors', validationErrors);

      assert.deepStrictEqual(isValid, true);
      assert.deepStrictEqual(validationErrors, []);
    });
    it('returns array with invalid payment method error when its not a valid one', () => {
      const entity = new TransactionEntity({ 
        ...newTransactionMock, paymentMethod: faker.random.word(),
      });

      const { isValid, validationErrors } = entity.validateNewTransaction();

      assert.deepStrictEqual(isValid, false);
      assert.deepStrictEqual(validationErrors.length > 0, true);
    });
    it('returns array with card expired error', () => {
      const entity = new TransactionEntity({ 
        ...newTransactionMock, cardExpirationDate: faker.date.past(10),
      });

      const { isValid, validationErrors } = entity.validateNewTransaction();

      assert.deepStrictEqual(isValid, false);
      assert.deepStrictEqual(validationErrors, [MESSAGES.transaction.create.expiredCard]);
    });
  });
});