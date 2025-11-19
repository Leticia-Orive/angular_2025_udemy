const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
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
