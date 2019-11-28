module.exports = {
  customers: {
    balance: {
      requiredCostumerUid: {
        errorCode: 1,
        message: 'The param customerUid is required.',
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
      }
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
