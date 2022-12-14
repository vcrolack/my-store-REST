const { Pool } = require('pg');

const { configPostgres } = require('../config/config');

const USER = encodeURIComponent(configPostgres.dbUser);
const PASSWORD = encodeURIComponent(configPostgres.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configPostgres.dbHost}:${configPostgres.dbPort}/${configPostgres.dbName}`;

const pool = new Pool({connectionString: URI});


module.exports = pool;
