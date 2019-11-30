/* eslint-disable */
const { assert } = require('chai');
const faker = require('faker');
const TransactionEntity = require('../../../src/domain/entities/transaction');
const { newTransactionMock } = require('../../mocks/transaction');
const MESSAGES = require('../../../src/domain/messages');

describe('Transaction Entity Tests', () => {
  describe('validate()', () => {
    describe('when input is invalid', () => {
      it('returns array with validation errors when input is not valid', () => {
        const entity = new TransactionEntity({});
  
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
    describe('when input is valid', () => {
      it('returns empty errors array when the input is valid and card is not expired', () => {
        const entity = new TransactionEntity(newTransactionMock);
  
        const { isValid, validationErrors } = entity.validateNewTransaction();
        console.log('validationErrors', validationErrors);
  
        // assert.deepStrictEqual(isValid, true);
        assert.deepStrictEqual(validationErrors, []);
      });
    });
  });
  describe('getSanitizedCardNumber()', () => {
    it('returns only the last four chars of the card number', () => {
      const entity = new TransactionEntity({ cardNumber: '1111 1111 1234' });

      assert.deepStrictEqual(entity.getSanitizedCardNumber(), 1234);
    });
  });
});