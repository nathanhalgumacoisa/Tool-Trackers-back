const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tooltrackers',
  password: 'ds564',
  port: 7777,
});

module.exports = pool;