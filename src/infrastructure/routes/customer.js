const express = require('express');
const customerCreateController = require('../controllers/customers/create');

const customerRouter = express.Router();

const router = () => {
  customerRouter.route('/').post(customerCreateController);

  return customerRouter;
};

module.exports = router;
