module.exports = {
  db: {
    connectionString: process.env.DATABASE_URL || process.env.LOCALDATABASE
  },
  session_secret: 'test'
}
