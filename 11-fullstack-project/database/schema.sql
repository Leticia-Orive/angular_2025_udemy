-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS fullstack_db;
USE fullstack_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  image_url VARCHAR(500),
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Datos de ejemplo para categorías
INSERT INTO categories (name, description, icon) VALUES
('Electrónica', 'Dispositivos electrónicos y accesorios', '💻'),
('Ropa', 'Ropa y accesorios de moda', '👕'),
('Alimentos', 'Alimentos y bebidas', '🍕'),
('Deportes', 'Artículos deportivos y fitness', '⚽'),
('Hogar', 'Artículos para el hogar y decoración', '🏠'),
('Libros', 'Libros y material educativo', '📚');

-- Datos de ejemplo para usuarios (password: 123456 para todos)
-- Hash generado con bcrypt para "123456"
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$YourHashHere', 'admin'),
('Juan Pérez', 'juan@example.com', '$2a$10$YourHashHere', 'user'),
('María García', 'maria@example.com', '$2a$10$YourHashHere', 'user');

-- Datos de ejemplo para productos
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
-- Electrónica (category_id = 1)
('Laptop Dell', 'Laptop profesional 16GB RAM', 999.99, 10, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 1),
('Mouse Logitech', 'Mouse inalámbrico ergonómico', 29.99, 50, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 1),
('Teclado Mecánico', 'Teclado RGB switches azules', 89.99, 25, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 1),
('Monitor LG 27"', 'Monitor 4K IPS', 399.99, 15, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 1),
('Auriculares Sony', 'Auriculares con cancelación de ruido', 149.99, 30, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 1),
('Tablet Samsung', 'Tablet 10" 128GB', 299.99, 20, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', 1),
-- Ropa (category_id = 2)
('Camiseta Nike', 'Camiseta deportiva algodón', 24.99, 100, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 2),
('Jeans Levis', 'Jeans clásicos azules', 59.99, 60, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 2),
('Chaqueta Adidas', 'Chaqueta deportiva impermeable', 79.99, 40, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 2),
('Zapatillas Puma', 'Zapatillas running profesionales', 89.99, 50, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 2),
-- Alimentos (category_id = 3)
('Café Premium', 'Café grano arábica 1kg', 19.99, 200, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', 3),
('Aceite Oliva', 'Aceite de oliva virgen extra 1L', 12.99, 150, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 3),
('Pasta Italiana', 'Pasta artesanal 500g', 4.99, 300, 'https://images.unsplash.com/photo-1551462147-37e725790fcf?w=400', 3),
('Chocolate Lindt', 'Chocolate suizo premium 100g', 8.99, 180, 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', 3),
-- Deportes (category_id = 4)
('Balón Fútbol', 'Balón profesional FIFA', 34.99, 80, 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400', 4),
('Raqueta Tenis', 'Raqueta profesional Wilson', 129.99, 25, 'https://images.unsplash.com/photo-1617083279720-fac3926089ad?w=400', 4),
('Bicicleta MTB', 'Bicicleta montaña 21 velocidades', 449.99, 15, 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', 4),
('Pesas Ajustables', 'Set de pesas 20kg', 69.99, 40, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', 4),
-- Hogar (category_id = 5)
('Lámpara LED', 'Lámpara escritorio regulable', 39.99, 70, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', 5),
('Almohada Memory', 'Almohada viscoelástica', 49.99, 90, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', 5),
-- Libros (category_id = 6)
('El Quijote', 'Edición completa ilustrada', 29.99, 50, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 6),
('Sapiens', 'Libro de Yuval Noah Harari', 24.99, 60, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400', 6);
