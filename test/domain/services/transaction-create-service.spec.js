const { assert } = require('chai');
const faker = require('faker');
const TransactionCreateService = require('../../../src/domain/services/transaction/create');
const httpResponse = require('../../../src/helpers/http-response');
const MESSAGES = require('../../../src/domain/messages');

describe('Transaction Create Service Tests', () => {
  describe('execute()', () => {
    describe('when input is invalid', () => {
      it('returns bad request status and error message when input transaction is not valid', () => {
        const validationErrors = [{ error: faker.random.words() }];
        const TransactionEntity = function() {
          this.validateNewTransaction = () => ({ isValid: false, validationErrors });
        };
        const PayableEntity = function() {};

        const service = new TransactionCreateService({ TransactionEntity, PayableEntity });

        assert(service.execute(), httpResponse
          .badRequest({ errors: validationErrors }));
      });
      it('returns unprocessable status and error message when a DB error occurs', (done) => {
        const errorMessage = faker.random.words();
        const dbException = new Error(errorMessage);
        const unprocessableEntityStatus = 422;
        
        const TransactionEntity = function() {
          this.getNewTransaction = () => ({});
          this.validateNewTransaction = () => ({ isValid: true, validationErrors: [] });
        };
        const PayableEntity = function() {
          this.getNewPayable = () => ({});
        };
        const transactionModel = {
          create: () => new Promise((_, reject) => {
            reject(dbException);
          }),
        };

        const service = new TransactionCreateService({
          TransactionEntity, PayableEntity, transactionModel, 
        });

        service.execute(faker.random.uuid())
          .then((errorResponse) => {
            assert.deepStrictEqual(errorResponse.status, unprocessableEntityStatus);
            assert.deepStrictEqual(errorResponse.output.error, errorMessage);
            assert.deepEqual(!!errorResponse.output.stack, true);
            done();
          });
      });
    });
    describe('when input is valid', () => {
      it('returns success status and success message when a transaction is created', (done) => {
        const TransactionEntity = function() {
          this.getNewTransaction = () => ({});
          this.validateNewTransaction = () => ({ isValid: true, validationErrors: [] });
        };
        const PayableEntity = function() {
          this.getNewPayable = () => ({});
        };
        const transactionModel = {
          create: () => new Promise((resolve) => {
            resolve(MESSAGES.transaction.create.success);
          }),
        };

        const service = new TransactionCreateService({
          TransactionEntity, PayableEntity, transactionModel, 
        });

        service.execute().then((result) => {
          assert(result, httpResponse
          .success(MESSAGES.transaction.create.success));

          done();
        });
      });
    });
  });
});