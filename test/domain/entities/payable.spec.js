/* eslint-disable */
const { assert } = require('chai');
const faker = require('faker');
const PayableEntity = require('../../../src/domain/entities/payable');
const { newTransactionMock } = require('../../mocks/transaction');
const MESSAGES = require('../../../src/domain/messages');
const PAYMENT_METHODS = require('../../../src/enums/payment-methods');

describe('Payable Entity Tests', () => {
  describe('validate()', () => {
    it('returns empty errors array when the input is valid', () => {
      const entity = new PayableEntity(newTransactionMock);

      assert.deepStrictEqual(entity.validate(), []);
    });
    it('returns array with invalid payment method error when its not a valid one', () => {
      const entity = new PayableEntity({ 
        ...newTransactionMock, paymentMethod: faker.random.word(),
      });

      assert.deepStrictEqual(entity.validate(), [MESSAGES.payable.create.invalidPaymentMethod]);
    });
  });
  describe('getStatus()', () => {
    it('returns paid status when payment method is debit_card', () => {
      const paymentMethod = 'debit_card';
      const entity = new PayableEntity({ ...newTransactionMock, paymentMethod });

      assert.deepStrictEqual(entity.getStatus(), PAYMENT_METHODS.toStatus[paymentMethod]);
    });
    it('returns waiting_funds status when payment method is credit_card', () => {
      const paymentMethod = 'credit_card';
      const entity = new PayableEntity({ ...newTransactionMock, paymentMethod });

      assert.deepStrictEqual(entity.getStatus(), PAYMENT_METHODS.toStatus[paymentMethod]);
    });
  });
  describe('getCreationDate()', () => {
    it('returns payment date today when payment method is debit_card', () => {
      const paymentMethod = 'debit_card';
      const entity = new PayableEntity({ ...newTransactionMock, paymentMethod });

      const resultDate = new Date(entity.getCreationDate()).toDateString();
      const expectedDate = new Date().toDateString();

      assert.deepStrictEqual(resultDate, expectedDate);
    });
    it('returns payment date 30 days today when payment method is credit_card', () => {
      const paymentMethod = 'credit_card';
      const entity = new PayableEntity({ ...newTransactionMock, paymentMethod });

      const resultDate = new Date(entity.getCreationDate()).toDateString();
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() + 30);

      assert.deepStrictEqual(resultDate, expectedDate.toDateString());
    });
  });
  describe('getFeeAndAmount()', () => {
    it('returns transaction amount as 3% fee and 97% amount when payment method is debit_card', () => {
      const paymentMethod = 'debit_card';
      const transactionMock = { ...newTransactionMock, paymentMethod };
      const entity = new PayableEntity(transactionMock);

      assert.deepStrictEqual(entity.getFeeAndAmount(), {
        amount: Number(transactionMock.amount) * 0.97,
        fee: Number(transactionMock.amount) * 0.03,
      });
    });
    it('returns transaction amount as 5% fee and 95% amount when payment method is credit_card', () => {
      const paymentMethod = 'credit_card';
      const transactionMock = { ...newTransactionMock, paymentMethod };
      const entity = new PayableEntity(transactionMock);

      assert.deepStrictEqual(entity.getFeeAndAmount(), {
        amount: Number(transactionMock.amount) * 0.95,
        fee: Number(transactionMock.amount) * 0.05,
      });
    });
  });
  describe('getNewPayable()', () => {
    it('returns new payable based on the input transaction', () => {
      const paymentMethod = 'debit_card';
      const transactionMock = { ...newTransactionMock, paymentMethod };
      const entity = new PayableEntity(transactionMock);

      const { createdAt, createdBy, payableUid, paymentDate, ...newPayable } = entity.getNewPayable();
      const todayDate = new Date().toDateString();

      assert.deepStrictEqual(newPayable, {
        amount: Number(transactionMock.amount) * 0.97,
        fee: Number(transactionMock.amount) * 0.03,
        status: PAYMENT_METHODS.toStatus[paymentMethod],
      });
      assert.deepStrictEqual(transactionMock, {});
      assert.deepStrictEqual(new Date(createdAt).toDateString(), todayDate);
      assert.deepStrictEqual(new Date(paymentDate).toDateString(), todayDate);
      assert.deepStrictEqual(!!paymentUid, true);
      assert.deepStrictEqual(!!transactionMock.customerUid, createdBy);
    });
  });
});
