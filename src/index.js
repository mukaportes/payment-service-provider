const startApp = require('./app');

const defaultAppPort = 3000;
const appPort = process.env.PORT || defaultAppPort;

startApp(appPort);