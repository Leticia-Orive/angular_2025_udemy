-- Agregar columna category_id a la tabla products (si no existe)
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id INT;

-- Agregar foreign key (si no existe)
ALTER TABLE products 
ADD CONSTRAINT fk_product_category 
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- Insertar categorías si no existen
INSERT IGNORE INTO categories (name, description, icon) VALUES
('Electrónica', 'Dispositivos electrónicos y accesorios', '💻'),
('Ropa', 'Ropa y accesorios de moda', '👕'),
('Alimentos', 'Alimentos y bebidas', '🍕'),
('Deportes', 'Artículos deportivos y fitness', '⚽'),
('Hogar', 'Artículos para el hogar y decoración', '🏠'),
('Libros', 'Libros y material educativo', '📚');

-- Actualizar productos existentes asignándoles categorías
UPDATE products SET category_id = 1 WHERE name LIKE '%Laptop%' OR name LIKE '%Mouse%' OR name LIKE '%Teclado%' OR name LIKE '%Monitor%';
