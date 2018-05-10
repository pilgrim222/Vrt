testConnection = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
}

module.exports.testConnection = testConnection;