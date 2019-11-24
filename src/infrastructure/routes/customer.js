const express = require('express');
const customerCreateController = require('../controllers/customers/create');
const customerBalanceController = require('../controllers/customers/balance');

const customerRouter = express.Router();

const router = () => {
  customerRouter.route('/').post(customerCreateController);
  customerRouter.route('/:customerUid/balance').get(customerBalanceController);

  return customerRouter;
};

module.exports = router;
