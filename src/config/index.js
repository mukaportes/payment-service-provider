const environment = process.env.NODE_ENV || 'local';

const config = require(`./environments/${environment}.js`);

module.exports = config;
