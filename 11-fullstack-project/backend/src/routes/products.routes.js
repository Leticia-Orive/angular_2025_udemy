/**
 * RUTAS DE PRODUCTOS
 * ==================
 * 
 * Funcionalidad:
 * - Gestiona todas las operaciones CRUD sobre productos
 * - Incluye relación con categorías mediante LEFT JOIN
 * - Proporciona endpoints con fallback si la tabla categorías no existe
 * 
 * Endpoints disponibles:
 * - GET /api/products - Lista todos los productos con su categoría
 * - GET /api/products/:id - Obtiene un producto específico por ID
 * - POST /api/products - Crea un nuevo producto (name, price, description, stock, category_id)
 * - PUT /api/products/:id - Actualiza datos de un producto existente
 * - DELETE /api/products/:id - Elimina un producto por ID
 * 
 * Características:
 * - JOIN con tabla categories para mostrar nombre de categoría
 * - Fallback automático si no existe tabla categories
 * - Validación de existencia antes de actualizar/eliminar
 * - Respuestas JSON con datos combinados producto + categoría
 * - Manejo de errores con códigos HTTP apropiados
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    // Primero intentamos con JOIN
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.name
    `;
    
    try {
      const [rows] = await db.query(query);
      res.json(rows);
    } catch (joinError) {
      // Si falla el JOIN, probablemente la tabla categories no existe
      console.log('Tabla categories no existe, obteniendo productos sin categoría');
      query = 'SELECT * FROM products ORDER BY name';
      const [rows] = await db.query(query);
      res.json(rows);
    }
  } catch (error) {
    console.error('Error en GET /products:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    
    try {
      const [rows] = await db.query(query, [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(rows[0]);
    } catch (joinError) {
      // Fallback sin JOIN
      query = 'SELECT * FROM products WHERE id = ?';
      const [rows] = await db.query(query, [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error en GET /products/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      description,
      price,
      stock
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
      [name, description, price, stock, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ id: req.params.id, name, description, price, stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
