const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs');
const customer = require('../infrastructure/routes/customer');
const transaction = require('../infrastructure/routes/transaction');

const buildRoutes = (app) => {
  app.use('/v1/customer', customer());
  app.use('/v1/transaction', transaction());
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
};

module.exports = buildRoutes;
