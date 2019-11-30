/* eslint-disable camelcase */

const methods = {
  creditCard: 'credit_card',
  debitCard: 'debit_card',
};

const toStatus = {
  credit_card: 'waiting_funds',
  debit_card: 'paid',
};

module.exports = {
  methods,
  toStatus,
};
