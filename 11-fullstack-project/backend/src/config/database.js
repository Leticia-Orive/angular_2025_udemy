const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fullstack_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify para usar async/await
const promisePool = pool.promise();

// Verificar conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err.message);
    return;
  }
  console.log('✅ Conectado a MySQL exitosamente');
  connection.release();
});

module.exports = promisePool;
