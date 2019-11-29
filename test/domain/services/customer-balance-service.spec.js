const { assert } = require('chai');
const faker = require('faker');
const CustomerBalanceService = require('../../../src/domain/services/customer/balance');
const httpResponse = require('../../../src/helpers/http-response');
const MESSAGES = require('../../../src/domain/messages');
const PAYABLE_STATUS = require('../../../src/enums/payable-status');

describe('Customer Balance Service Tests', () => {
  describe('execute()', () => {
    describe('when input is invalid', () => {
      it('returns badRequest status and error message when customerUid is not given', () => {
        const service = new CustomerBalanceService({});
        const result = service.execute();
  
        assert.deepStrictEqual(result, httpResponse
          .badRequest(MESSAGES.customers.balance.requiredCostumerUid));
      });
      it('returns unprocessableEntity status and error message when DB throws an exception', (done) => {
        const errorMessage = faker.random.words();
        const dbException = new Error(errorMessage);
        const unprocessableEntityStatus = 422;

        const service = new CustomerBalanceService({
          transactionModel: {
            findAll: () => new Promise((_, reject) => {
              reject(dbException);
            }),
          },
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
      it('returns success status and customer balance when DB operation is successful', (done) => {
        const paidAmount = faker.finance.amount();
        const waitingFundsAmount = faker.finance.amount();

        const service = new CustomerBalanceService({
          transactionModel: {
            findAll: () => new Promise((resolve) => {
              resolve([
                {
                  amount: paidAmount,
                  status: PAYABLE_STATUS.paid,
                },
                {
                  amount: paidAmount,
                  status: PAYABLE_STATUS.paid,
                },
                {
                  amount: waitingFundsAmount,
                  status: PAYABLE_STATUS.waitingFunds,
                },
                {
                  amount: waitingFundsAmount,
                  status: PAYABLE_STATUS.waitingFunds,
                },
              ]);
            }),
          },
        });

        service.execute(faker.random.uuid())
          .then((result) => {
            assert.deepStrictEqual(result, httpResponse.success({
              paid: Number(paidAmount) * 2,
              waitingFunds: Number(waitingFundsAmount) * 2,
            }));
            done();
          });
      });
    });
  });
});