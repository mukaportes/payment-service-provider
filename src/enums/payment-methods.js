/* eslint-disable camelcase */

const toString = {
  1: 'credit_card',
  2: 'debit_card',
};

const toNumber = {
  credit_card: 1,
  debit_card: 2,
};

const toStatus = {
  credit_card: 'waiting_funds',
  debit_card: 'paid',
};

module.exports = {
  toNumber,
  toStatus,
  toString,
};
