const customer = require('../infrastructure/routes/customer');

const buildRoutes = (app) => {
  app.use('/v1/customer', customer());

  return app;
};

module.exports = buildRoutes;
