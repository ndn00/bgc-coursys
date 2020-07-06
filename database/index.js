const pg = require('pg');

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCALDATABASE
});
pool.on('error', (err) => {
  console.error('Unexpected database issue', err);
  process.exit(-1);
});

module.exports = {
  pool,
  query: (queryString, params, callback) => {
    return pool.query(queryString, params, callback);
  }
};
