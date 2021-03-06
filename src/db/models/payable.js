// const transactionModel = require('./transaction'); 

/* eslint-disable max-lines-per-function, sort-keys, max-lines */
module.exports = (sequelize, DataTypes) => {
  const payable = sequelize.define('payable', {
    payableUid: {
      field: 'payable_uid',
      primaryKey: true,
      type: DataTypes.UUID,
    },
    transactionUid: {
      field: 'transaction_uid',
      primaryKey: false,
      type: DataTypes.UUID,
    },
    status: {
      field: 'status',
      primaryKey: false,
      type: DataTypes.INTEGER,
    },
    fee: {
      field: 'fee',
      primaryKey: false,
      type: DataTypes.DECIMAL(15, 3),
    },
    amount: {
      field: 'amount',
      primaryKey: false,
      type: DataTypes.DECIMAL(15, 3),
    },
    paymentDate: {
      field: 'payment_date',
      primaryKey: false,
      type: DataTypes.DATE,
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
    tableName: 'payable',
    timestamps: false,
    schema: 'psp',
  });

  // const transaction = transactionModel(sequelize, DataTypes);

  // transaction.hasOne(payable, { foreignKey: 'transactionUid', as: 'payable' });
  // payable.belongsTo(transaction, { foreignKey: 'transactionUid', as: 'transaction' });

  return payable;
};
