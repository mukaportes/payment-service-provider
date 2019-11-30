const faker = require('faker');
const PAYMENT_METHODS = require('../../src/enums/payment-methods');

module.exports = {
  newTransactionMock: {
    amount: faker.finance.amount(),
    cardCvv: faker.finance.creditCardCVV(),
    cardExpirationDate: faker.date.future(),
    cardHolderName: faker.name.findName(),
    cardNumber: faker.finance.creditCardNumber(),
    customerUid: faker.random.uuid(),
    description: faker.lorem.sentence(),
    paymentMethod: Object
      .values(PAYMENT_METHODS.methods)[faker.random.number({ max: 1, min: 0 })],
  },
};