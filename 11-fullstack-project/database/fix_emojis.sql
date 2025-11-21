-- Actualizar la codificación de la base de datos a UTF8MB4 (soporta emojis)
ALTER DATABASE fullstack_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Actualizar la tabla de categorías
ALTER TABLE categories CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Actualizar específicamente la columna icon
ALTER TABLE categories MODIFY icon VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Actualizar también products y users por si acaso
ALTER TABLE products CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Actualizar los iconos con los emojis correctos
UPDATE categories SET icon = '💻' WHERE name = 'Electrónica';
UPDATE categories SET icon = '👕' WHERE name = 'Ropa';
UPDATE categories SET icon = '🍕' WHERE name = 'Alimentos';
UPDATE categories SET icon = '⚽' WHERE name = 'Deportes';
UPDATE categories SET icon = '🏠' WHERE name = 'Hogar';
UPDATE categories SET icon = '📚' WHERE name = 'Libros';

-- Verificar los cambios
SELECT id, name, icon FROM categories ORDER BY id;
