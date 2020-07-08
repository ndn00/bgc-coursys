//index.js
//adapted from https://github.com/DayOnePl/dos-server/blob/master/db/index.js
//Database API - all queries made through here

const pg = require('pg');

//use connection string to create new database instance
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
