module.exports = {
  client: 'pg',
  connection: {
    database: process.env.DATABASE_NAME || 'psp_db',
    host: process.env.DATABASE_HOST || 'localhost',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER || 'postgres',
  },
  debug: true,
  migrations: {
    directory: 'migrations',
  },
  seeds: {
    directory: 'seeds',
  },
};
