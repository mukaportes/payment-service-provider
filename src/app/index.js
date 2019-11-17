const express = require('express');
const buildRoutes = require('../loaders/build-routes');
const setupDb = require('../loaders/db');
const setupMiddlewares = require('../loaders/setup-middlewares');

const startExpress = (port) => {
  try {
    const app = express();

    setupMiddlewares(app);
    buildRoutes(app);
    setupDb();

    const server = app.listen(port);
    server.on('error', (error) => { throw new Error(error); });

    console.info(`App is listening on port ${port}`);
  } catch (error) {
    console.error(`App failed to listen on port ${port}`, error);
  }
};

module.exports = startExpress;
