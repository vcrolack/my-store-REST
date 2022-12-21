const { configPostgres } = require('../config/config');

const USER = encodeURIComponent(configPostgres.dbUser);
const PASSWORD = encodeURIComponent(configPostgres.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configPostgres.dbHost}:${configPostgres.dbPort}/${configPostgres.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
