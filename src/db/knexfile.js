module.exports = {
  client: 'pg',
  connection: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
  },
  debug: true,
  migrations: {
    directory: 'migrations',
  },
  seeds: {
    directory: 'seeds',
  },
};
