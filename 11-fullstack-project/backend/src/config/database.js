/**
 * CONFIGURACIÓN DE BASE DE DATOS
 * ===============================
 * 
 * Funcionalidad:
 * - Establece conexión con MySQL usando mysql2
 * - Crea un pool de conexiones para mejor rendimiento
 * - Usa promesas para trabajar con async/await
 * 
 * Características:
 * - Pool de 10 conexiones simultáneas máximo
 * - Charset UTF8MB4 para soportar emojis
 * - Reconexión automática si se pierde la conexión
 * - Variables de entorno desde archivo .env
 * 
 * Configuración:
 * - Host: localhost
 * - Puerto: 3306 (por defecto MySQL)
 * - Base de datos: fullstack_db
 * - Usuario y contraseña desde .env
 */

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
  queueLimit: 0,
  charset: 'utf8mb4'
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
