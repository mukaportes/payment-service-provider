const { assert } = require('chai');
const faker = require('faker');
const CustomerCreateService = require('../../../src/domain/services/customer/create');
const httpReponse = require('../../../src/helpers/http-response');
const MESSAGES = require('../../../src/domain/messages');

describe('Customer Create Service Tests', () => {
  describe('execute()', () => {
    describe('when input is invalid', () => {
      it('returns bad request status and error message when input customer is not valid', () => {
        const validationErrors = [{ error: faker.random.words() }]
        const CustomerEntity = function () {
          this.validateNewCustomer = () => ({ isValid: false, validationErrors });
        };
        const service = new CustomerCreateService(CustomerEntity);

        assert.deepStrictEqual(service.execute(), httpReponse
          .badRequest({ errors: validationErrors }));
      });
      it('returns unprocessable entity status and error message when an DB error occurrs', (done) => {
        const errorMessage = faker.random.words();
        const dbException = new Error(errorMessage);
        const unprocessableEntityStatus = 422;

        const CustomerEntity = function () {
          this.getNewCustomer = () => ({});
          this.validateNewCustomer = () => ({ isValid: true, validationErrors: [] });
        };

        const customerModel = {
          create: () => new Promise((_, reject) => {
            reject(dbException);
          }),
        };

        const service = new CustomerCreateService(CustomerEntity, customerModel);

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
      it('returns success status and success message when input customer is created', (done) => {
        const CustomerEntity = function () {
          this.getNewCustomer = () => ({});
          this.validateNewCustomer = () => ({ isValid: true, validationErrors: [] });
        };
        const customerModel = {
          create: () => new Promise(resolve => resolve({})),
        };

        const service = new CustomerCreateService(CustomerEntity, customerModel);

        service.execute().then((result) => {
          assert.deepStrictEqual(result, httpReponse
            .success(MESSAGES.customers.create.success));

          done();
        })
      });
    });
  });
});