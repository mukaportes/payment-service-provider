/* eslint-disable max-lines-per-function, sort-keys, max-lines */
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    transactionUid: {
      field: 'transaction_uid',
      primaryKey: true,
      type: DataTypes.UUID,
    },
    customerUid: {
      field: 'customer_uid',
      primaryKey: false,
      type: DataTypes.UUID,
    },
    amount: {
      field: 'amount',
      primaryKey: false,
      type: DataTypes.DECIMAL(15, 3),
    },
    description: {
      field: 'description',
      primaryKey: false,
      type: DataTypes.STRING,
    },
    paymentMethod: {
      field: 'payment_method',
      primaryKey: false,
      type: DataTypes.INTEGER,
    },
    cardNumber: {
      field: 'card_number',
      primaryKey: false,
      type: DataTypes.INTEGER,
    },
    cardHolderName: {
      field: 'card_holder_name',
      primaryKey: false,
      type: DataTypes.STRING,
    },
    cardExpirationDate: {
      field: 'card_expiration_date',
      primaryKey: false,
      type: DataTypes.DATE,
    },
    cardCvv: {
      field: 'card_cvv',
      primaryKey: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      field: 'created_at',
      primaryKey: false,
      type: DataTypes.DATE,
    },
    createdBy: {
      field: 'created_by',
      primaryKey: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'transaction',
    timestamps: false,
    schema: 'psp',
  });

  return transaction;
};
