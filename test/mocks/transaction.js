const faker = require('faker');
const PAYMENT_METHODS = require('../../src/enums/payment-methods');

module.exports = {
  newTransactionMock: {
    amount: faker.finance.amount(),
    cardCvv: faker.random.number({ max: 9999, min: 1 }),
    cardExpirationDate: faker.date.future(),
    cardHolderName: faker.name.findName(),
    cardNumber: '1234 1234 1234 1234',
    customerUid: faker.random.uuid(),
    description: faker.lorem.sentence(),
    paymentMethod: PAYMENT_METHODS.methods.debitCard,
  },
};