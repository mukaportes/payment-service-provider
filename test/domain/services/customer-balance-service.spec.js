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

        const transactionPaidTemplate = {
          amount: paidAmount,
          status: PAYABLE_STATUS.paid,
        };
        const transactionWaitingFundsTemplate = {
          amount: waitingFundsAmount,
          status: PAYABLE_STATUS.waitingFunds,
        };

        const service = new CustomerBalanceService({
          transactionModel: {
            findAll: () => new Promise((resolve) => {
              resolve([
                { payable: transactionPaidTemplate },
                { payable: transactionPaidTemplate },
                { payable: transactionWaitingFundsTemplate },
                { payable: transactionWaitingFundsTemplate },
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
      it('returns success status and customer balance zero when user has no transactions', (done) => {
        const service = new CustomerBalanceService({
          transactionModel: {
            findAll: () => new Promise((resolve) => {
              resolve([{}]);
            }),
          },
        });

        service.execute(faker.random.uuid())
          .then((result) => {
            assert.deepStrictEqual(result, httpResponse.success({ paid: 0, waitingFunds: 0 }));
            done();
          });
      });
      it('returns success status and customer paid balance zero when user has only transactions with waiting funds payable', (done) => {
        const waitingFundsAmount = faker.finance.amount();
        const transactionWaitingFundsTemplate = {
          amount: waitingFundsAmount,
          status: PAYABLE_STATUS.waitingFunds,
        };

        const service = new CustomerBalanceService({
          transactionModel: {
            findAll: () => new Promise((resolve) => {
              resolve([
                { payable: transactionWaitingFundsTemplate }
              ]);
            }),
          },
        });

        service.execute(faker.random.uuid())
          .then((result) => {
            assert.deepStrictEqual(result.output, { paid: 0, waitingFunds: Number(waitingFundsAmount) });
            done();
          });
      });
      it('returns success status and customer waiting funds balance zero when user has only transactions with paid payable', (done) => {
        const paidAmount = faker.finance.amount();
        const transactionPaidTemplate = {
          amount: paidAmount,
          status: PAYABLE_STATUS.paid,
        };

        const service = new CustomerBalanceService({
          transactionModel: {
            findAll: () => new Promise((resolve) => {
              resolve([
                { payable: transactionPaidTemplate }
              ]);
            }),
          },
        });

        service.execute(faker.random.uuid())
          .then((result) => {
            assert.deepStrictEqual(result.output, { paid: Number(paidAmount), waitingFunds: 0 });
            done();
          });
      });
    });
  });
});