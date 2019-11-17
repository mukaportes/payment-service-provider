const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
};
