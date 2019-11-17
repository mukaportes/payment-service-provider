const transaction = require('../../infrastructure/routes/transaction');

const buildRoutes = (app) => {
  app.use('/v1/transaction', transaction());

  return app;
};

module.exports = buildRoutes;
