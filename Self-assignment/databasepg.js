const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OrderSystem',
  password: 'Bingo070122!',
  port: 5432,
})

module.exports = {
  pool
}