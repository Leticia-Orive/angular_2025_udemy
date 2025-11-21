/**
 * RUTAS DE CATEGORÍAS
 * ===================
 * 
 * Funcionalidad:
 * - Gestiona todas las operaciones CRUD sobre categorías de productos
 * - Proporciona endpoints para organizar productos en grupos temáticos
 * 
 * Endpoints disponibles:
 * - GET /api/categories - Lista todas las categorías ordenadas por nombre
 * - GET /api/categories/:id - Obtiene una categoría específica por ID
 * - POST /api/categories - Crea una nueva categoría (name, description, icon)
 * - PUT /api/categories/:id - Actualiza datos de una categoría existente
 * - DELETE /api/categories/:id - Elimina una categoría por ID
 * 
 * Características:
 * - Usa async/await con mysql2 promise pool
 * - Validación de campo name requerido al crear
 * - Soporte para emojis en el campo icon (charset UTF8MB4)
 * - Respuestas JSON estructuradas con mensajes de éxito/error
 * - Manejo de errores con códigos HTTP apropiados (400, 404, 500)
 * 
 * Nota técnica:
 * - Este archivo fue corregido de callbacks a async/await
 * - Usa destructuring [results] para obtener solo las filas de la consulta
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(results);
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error al obtener categoría:', err);
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const query = 'INSERT INTO categories (name, description, icon) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [name, description, icon]);
    
    res.status(201).json({
      id: result.insertId,
      name,
      description,
      icon,
      message: 'Categoría creada exitosamente'
    });
  } catch (err) {
    console.error('Error al crear categoría:', err);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    const query = 'UPDATE categories SET name = ?, description = ?, icon = ? WHERE id = ?';
    const [result] = await db.query(query, [name, description, icon, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría actualizada exitosamente' });
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

// Obtener productos por categoría
router.get('/:id/products', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.category_id = ?
      ORDER BY p.name
    `;
    
    const [results] = await db.query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;
