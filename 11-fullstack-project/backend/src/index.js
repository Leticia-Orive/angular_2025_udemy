/**
 * BACKEND - SERVIDOR PRINCIPAL
 * ============================
 * 
 * Funcionalidad:
 * - Servidor Express que maneja la API REST del e-commerce
 * - Gestiona peticiones HTTP (GET, POST, PUT, DELETE)
 * - Conecta el frontend Angular con la base de datos MySQL
 * 
 * Características:
 * - CORS habilitado para permitir peticiones desde el frontend (puerto 4200)
 * - Body parser para procesar datos JSON y formularios
 * - Organización modular con rutas separadas por entidad
 * - Puerto configurable desde variables de entorno
 * 
 * Rutas disponibles:
 * - /api/auth - Autenticación (login, registro, verificación JWT)
 * - /api/users - CRUD de usuarios (solo admin)
 * - /api/products - CRUD de productos
 * - /api/categories - CRUD de categorías de productos
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');
const categoriesRoutes = require('./routes/categories.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Fullstack funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
