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
const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Fullstack funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
