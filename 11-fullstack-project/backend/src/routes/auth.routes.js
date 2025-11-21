/**
 * RUTAS DE AUTENTICACIÓN
 * ======================
 * 
 * Funcionalidad:
 * - Gestiona el registro, login y verificación de usuarios
 * - Implementa seguridad con JWT (JSON Web Tokens)
 * - Hashea contraseñas con bcrypt para almacenamiento seguro
 * 
 * Endpoints disponibles:
 * - POST /api/auth/register - Registra un nuevo usuario
 *   · Requiere: name, email, password
 *   · Opcional: role (por defecto 'user')
 *   · Valida email único
 *   · Hashea password con bcrypt (10 rondas)
 *   · Retorna usuario + token JWT
 * 
 * - POST /api/auth/login - Inicia sesión de usuario existente
 *   · Requiere: email, password
 *   · Compara password hasheada con bcrypt.compare()
 *   · Retorna usuario + token JWT (válido 24 horas)
 * 
 * - GET /api/auth/verify - Verifica si un token JWT es válido
 *   · Requiere: Header Authorization con Bearer token
 *   · Retorna datos del usuario si el token es válido
 * 
 * Características de seguridad:
 * - Passwords hasheadas con bcrypt (nunca se guardan en texto plano)
 * - Tokens JWT con expiración de 24 horas
 * - Validación de campos requeridos
 * - Verificación de email único al registrar
 * - Secret key desde variable de entorno (JWT_SECRET)
 * 
 * Estructura del token JWT:
 * - Payload: { id, email, role }
 * - Firma: JWT_SECRET desde .env
 * - Expiración: 24h
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiala_en_produccion';

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el email ya existe
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    // Generar token JWT
    const token = jwt.sign(
      { id: result.insertId, email, role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: result.insertId, name, email, role },
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario por email
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Verificar token (opcional - para validar si el token es válido)
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Token inválido' });
  }
});

module.exports = router;
