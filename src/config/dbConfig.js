import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tooltrackers',
  password: '12345',
  port: 7777,
});

export default pool