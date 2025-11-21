/**
 * RUTAS DE USUARIOS
 * =================
 * 
 * Funcionalidad:
 * - Gestiona todas las operaciones CRUD sobre usuarios
 * - Proporciona endpoints para listar, crear, actualizar y eliminar usuarios
 * 
 * Endpoints disponibles:
 * - GET /api/users - Lista todos los usuarios
 * - GET /api/users/:id - Obtiene un usuario específico por ID
 * - POST /api/users - Crea un nuevo usuario (name, email)
 * - PUT /api/users/:id - Actualiza datos de un usuario existente
 * - DELETE /api/users/:id - Elimina un usuario por ID
 * 
 * Características:
 * - Usa async/await para consultas a MySQL
 * - Validación de existencia antes de actualizar/eliminar
 * - Respuestas JSON estructuradas
 * - Manejo de errores con códigos HTTP apropiados
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ id: req.params.id, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
