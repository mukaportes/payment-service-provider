const customer = require('../infrastructure/routes/customer');
const transaction = require('../infrastructure/routes/transaction');

const buildRoutes = (app) => {
  app.use('/v1/customer', customer());
  app.use('/v1/transaction', transaction());

  return app;
};

module.exports = buildRoutes;
