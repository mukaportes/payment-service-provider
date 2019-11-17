const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  db: {
    database: process.env.DATABASE_NAME,
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
  },
};
