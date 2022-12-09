const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'rolack',
  password: 'admin123',
  database: 'rolack-store',
});


module.exports = pool;
