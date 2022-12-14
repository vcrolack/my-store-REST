require('dotenv').config();

const configPostgres = {
  env: process.env.NODE_ENV || 'dev',
  dbPort: process.env.DB_PORT || 3000,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.POSTGRES_DB
}

const configMySQL = {
  env: process.env.NODE_ENV || 'dev',
  dbPort: process.env.DB_PORT || 3000,
  dbUser: process.env.MYSQL_USER,
  dbPassword: process.env.MYSQL_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.MYSQL_DB
}

module.exports = { configPostgres, configMySQL };
