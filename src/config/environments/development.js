module.exports = {
  db: {
    database: process.env.DATABASE_NAME,
    dialect: 'postgres',
    dialectOptions: {
      multipleStatements: true,
    },
    host: process.env.DATABASE_HOST,
    logging: console.log,
    password: process.env.DATABASE_PASSWORD,
    pool: {
      idle: process.env.DATABASE_IDLE_TIME || 10000,
      max: process.env.DATABASE_MAX_POOL || 30,
      min: process.env.DATABASE_MIN_POOL || 10,
    },
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
  },
};
