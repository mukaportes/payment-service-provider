const transactionModel = require('./transaction');

/* eslint-disable max-lines-per-function, sort-keys, max-lines */
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    customerUid: {
      field: 'customer_uid',
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      field: 'name',
      primaryKey: false,
      type: DataTypes.STRING,
    },
    country: {
      field: 'country',
      primaryKey: false,
      type: DataTypes.STRING,
    },
    birthday: {
      field: 'birthday',
      primaryKey: false,
      type: DataTypes.DATE,
    },
    email: {
      field: 'email',
      primaryKey: false,
      type: DataTypes.STRING,
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
    updatedAt: {
      field: 'updated_at',
      primaryKey: false,
      type: DataTypes.DATE,
    },
    updatedBy: {
      field: 'updated_by',
      primaryKey: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'customer',
    timestamps: false,
    schema: 'psp',
  });

  const transaction = transactionModel(sequelize, DataTypes);

  customer.hasMany(transaction, { foreignKey: 'customerUid', as: 'transactions' });
  transaction.belongsTo(customer, { foreignKey: 'customerUid', as: 'customer' });

  return customer;
};
