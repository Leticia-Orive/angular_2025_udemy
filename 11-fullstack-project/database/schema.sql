-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS fullstack_db;
USE fullstack_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Datos de ejemplo para usuarios
INSERT INTO users (name, email) VALUES
('Juan Pérez', 'juan@example.com'),
('María García', 'maria@example.com'),
('Carlos López', 'carlos@example.com');

-- Datos de ejemplo para productos
INSERT INTO products (name, description, price, stock) VALUES
('Laptop Dell', 'Laptop profesional 16GB RAM', 999.99, 10),
('Mouse Logitech', 'Mouse inalámbrico ergonómico', 29.99, 50),
('Teclado Mecánico', 'Teclado RGB switches azules', 89.99, 25),
('Monitor LG 27"', 'Monitor 4K IPS', 399.99, 15);
