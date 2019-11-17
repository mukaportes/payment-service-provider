const express = require('express');
// const resolver = require('../middlewares/controller-resolver');
// const controllerFactory = require('../../factories/controller/transaction');

const checklistRouter = express.Router();

const router = () => {
  // checklistRouter
  //   .route('/')
  //   .get(resolver.bind(controllerFactory));

  return checklistRouter;
};

module.exports = router;
