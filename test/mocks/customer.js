const faker = require('faker');

module.exports = {
  newCustomerMock: {
    birthday: faker.date.recent(),
    country: faker.address.countryCode(),
    email: faker.internet.email(),
    name: faker.name.findName(),
  },
};