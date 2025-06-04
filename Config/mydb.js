const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// MySQL/MariaDB connection configuration
const config = {
  host: process.env.DB_SERVER, // e.g., localhost
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 3306 // Default MySQL port is 3306
};

// Create a pool of connections
const pool = mysql.createPool(config);

// To make queries easily available
const poolPromise = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL Connection Pool Error:', err);
    return;
  }
  console.log('Connected to MySQL/MariaDB');
  connection.release(); // Always release the connection when done
});

module.exports = {
  mysql, pool, poolPromise
};
