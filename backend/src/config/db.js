const { Pool } = require('pg');
require('dotenv').config();

// The Pool will use the environment variables (PGUSER, PGHOST, etc.)
// automatically if they are present in .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Export a query function to be used throughout the application
module.exports = {
    query: (text, params) => pool.query(text, params),
};
