const { assert } = require('chai');
const faker = require('faker');
const TransactionGetAllService = require('../../../src/domain/services/transaction/get-all');
const httpResponse = require('../../../src/helpers/http-response');

describe('Transaction Get All Service', () => {
  describe('execute()', () => {
    describe('when input is invalid', () => {
      it('returns unprocessable entity status and error message when a DB error occurs', (done) => {
        const errorMessage = faker.random.words();
        const dbException = new Error(errorMessage);
        const unprocessableEntityStatus = 422;
        
        const transactionModel = {
          findAll: () => new Promise((_, reject) => {
            reject(dbException);
          }),
        };

        const service = new TransactionGetAllService({ transactionModel });

        service.execute(faker.random.uuid())
          .then((errorResponse) => {
            assert.deepStrictEqual(errorResponse.status, unprocessableEntityStatus);
            assert.deepStrictEqual(errorResponse.output.error, errorMessage);
            assert.deepEqual(!!errorResponse.output.stack, true);
            done();
          });
      });
    });
    describe('when input is svalid', () => {
      it('returns success status and all transactions when they are succesfully retrieved', (done) => {
        const transactions = [{ transactionUid: faker.random.uuid() }];
        const transactionModel = {
          findAll: () => new Promise(resolve => resolve(transactions)),
        };

        const service = new TransactionGetAllService({ transactionModel });

        service.execute().then((result) => {
          assert.deepStrictEqual(result, httpResponse.success({ transactions }));

          done();
        });
      });
    });
  });
});