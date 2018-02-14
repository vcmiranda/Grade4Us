// Update with your config settings.

module.exports = {

  production: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 3306,
      host: process.env.DB_HOST,
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 3306,
      host: process.env.DB_HOST,
    },
  },

  development: {
    client: 'mysql',
    connection: {
      database: 'grade4us',
      user: 'grade4us',
      password: 'grade4us',
      port: 3306,
      host: process.env.DB_HOST,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../database/migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },
};
