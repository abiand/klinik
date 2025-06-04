const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // IT-ADAM\\LARAVEL
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
		instanceName: process.env.DB_INSTANCE
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('SQL Server Connection Pool Error:', err);
});

module.exports = {
    sql, pool, poolConnect
};
