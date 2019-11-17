const cors = require('cors');
const bodyParser = require('body-parser');
const handleErrors = require('../infrastructure/middlewares/error-handlers');

/**
 * @description Sets up default data handlers for an Express app
 * @param {Express} app Express app instance 
 */
const setupMiddlewares = (app) => {
  handleErrors();
  app.use(cors());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '20mb', parameterLimit: 10000 }));
};

module.exports = setupMiddlewares;
