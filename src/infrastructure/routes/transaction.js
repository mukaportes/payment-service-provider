const express = require('express');
const transactionCreateController = require('../controllers/transaction/create');

const transactionRouter = express.Router();

const router = () => {
  transactionRouter.route('/').post(transactionCreateController);

  return transactionRouter;
};

module.exports = router;
