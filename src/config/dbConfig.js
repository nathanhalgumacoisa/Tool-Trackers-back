import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tooltrackers',
  password: 'ds564',
  port: 7777,
});

export default pool