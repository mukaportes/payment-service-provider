const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/environments/local');

const db = {};
const { user, password, database, ...options } = config.db;
const sequelize = new Sequelize(database, user, password, options);

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = { ...db, Sequelize, sequelize };
