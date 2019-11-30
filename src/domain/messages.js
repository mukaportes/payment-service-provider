/* eslint-disable sort-keys */
module.exports = {
  customers: {
    balance: {
      requiredCostumerUid: {
        errorCode: 1,
        message: 'The param customerUid is required.',
      },
    },
    create: {
      success: {
        code: 5,
        message: 'Customer successfully created.',
      },
    },
  },
  transaction: {
    create: {
      success: {
        code: 2,
        message: 'Transaction successfully created.',
      },
      expiredCard: {
        code: 4,
        message: 'Card given is expired.',
      },
    },
  },
  payable: {
    create: {
      invalidPaymentMethod: {
        code: 3,
        message: 'Invalid payment method.',
      },
    },
  },
};
