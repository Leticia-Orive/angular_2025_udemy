-- Usar la base de datos
USE fullstack_db;

-- Crear tabla de categorías si no existe
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Verificar si la columna category_id existe en products
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'fullstack_db' 
  AND TABLE_NAME = 'products' 
  AND COLUMN_NAME = 'category_id';

-- Agregar columna category_id si no existe
SET @sql = IF(@col_exists = 0,
  'ALTER TABLE products ADD COLUMN category_id INT',
  'SELECT "La columna category_id ya existe" as message'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Verificar si existe la foreign key
SET @fk_exists = 0;
SELECT COUNT(*) INTO @fk_exists
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE CONSTRAINT_SCHEMA = 'fullstack_db'
  AND TABLE_NAME = 'products'
  AND CONSTRAINT_TYPE = 'FOREIGN KEY'
  AND CONSTRAINT_NAME LIKE '%category%';

-- Agregar foreign key si no existe
SET @sql = IF(@fk_exists = 0,
  'ALTER TABLE products ADD CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL',
  'SELECT "La foreign key ya existe" as message'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Insertar categorías (ignorar duplicados)
INSERT IGNORE INTO categories (name, description, icon) VALUES
('Electrónica', 'Dispositivos electrónicos y accesorios', '💻'),
('Ropa', 'Ropa y accesorios de moda', '👕'),
('Alimentos', 'Alimentos y bebidas', '🍕'),
('Deportes', 'Artículos deportivos y fitness', '⚽'),
('Hogar', 'Artículos para el hogar y decoración', '🏠'),
('Libros', 'Libros y material educativo', '📚');

-- Actualizar productos existentes (solo si category_id es NULL)
UPDATE products SET category_id = 1 
WHERE category_id IS NULL 
  AND (name LIKE '%Laptop%' OR name LIKE '%Mouse%' OR name LIKE '%Teclado%' OR name LIKE '%Monitor%' OR name LIKE '%Auriculares%' OR name LIKE '%Tablet%');

SELECT 'Migración completada exitosamente' as message;
