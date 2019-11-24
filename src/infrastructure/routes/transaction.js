const express = require('express');
const createTransactionController = require('../controllers/transaction/create');
const getAllTransactionController = require('../controllers/transaction/get-all');

const transactionRouter = express.Router();

const router = () => {
  transactionRouter.route('/').post(createTransactionController);
  transactionRouter.route('/').get(getAllTransactionController);

  return transactionRouter;
};

module.exports = router;
