const express = require('express');
const customerCreateController = require('../controllers/customer/create');
const customerBalanceController = require('../controllers/customer/balance');

const customerRouter = express.Router();

const router = () => {
  customerRouter.route('/').post(customerCreateController);
  customerRouter.route('/:customerUid/balance').get(customerBalanceController);

  return customerRouter;
};

module.exports = router;
