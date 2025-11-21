-- Script para actualizar productos con sus categorías correctas
USE fullstack_db;

-- Primero, limpiar productos antiguos que no tienen categoría
DELETE FROM products WHERE category_id IS NULL;

-- Insertar productos de todas las categorías (si no existen)
-- Electrónica (category_id = 1)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Laptop Dell', 'Laptop profesional 16GB RAM', 999.99, 10, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 1),
('Mouse Logitech', 'Mouse inalámbrico ergonómico', 29.99, 50, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 1),
('Teclado Mecánico', 'Teclado RGB switches azules', 89.99, 25, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 1),
('Monitor LG 27"', 'Monitor 4K IPS', 399.99, 15, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 1),
('Auriculares Sony', 'Auriculares con cancelación de ruido', 149.99, 30, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 1),
('Tablet Samsung', 'Tablet 10" 128GB', 299.99, 20, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', 1),
('Smartphone iPhone', 'iPhone 15 Pro Max 256GB', 1199.99, 35, 'https://images.unsplash.com/photo-1592286927505-38a47b290a0d?w=400', 1),
('Cámara Canon', 'Cámara DSLR profesional', 799.99, 12, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', 1)
ON DUPLICATE KEY UPDATE category_id=1;

-- Ropa (category_id = 2)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Camiseta Nike', 'Camiseta deportiva algodón', 24.99, 100, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 2),
('Jeans Levis', 'Jeans clásicos azules', 59.99, 60, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 2),
('Chaqueta Adidas', 'Chaqueta deportiva impermeable', 79.99, 40, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 2),
('Zapatillas Puma', 'Zapatillas running profesionales', 89.99, 50, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 2),
('Vestido Zara', 'Vestido elegante negro', 49.99, 45, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 2),
('Sudadera H&M', 'Sudadera con capucha', 34.99, 80, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 2)
ON DUPLICATE KEY UPDATE category_id=2;

-- Alimentos (category_id = 3)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Café Premium', 'Café grano arábica 1kg', 19.99, 200, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', 3),
('Aceite Oliva', 'Aceite de oliva virgen extra 1L', 12.99, 150, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 3),
('Pasta Italiana', 'Pasta artesanal 500g', 4.99, 300, 'https://images.unsplash.com/photo-1551462147-37e725790fcf?w=400', 3),
('Chocolate Lindt', 'Chocolate suizo premium 100g', 8.99, 180, 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', 3),
('Miel Orgánica', 'Miel pura de abeja 500g', 14.99, 120, 'https://images.unsplash.com/photo-1587049352846-4a222e784098?w=400', 3),
('Té Verde', 'Té verde japonés premium 100g', 9.99, 160, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400', 3)
ON DUPLICATE KEY UPDATE category_id=3;

-- Deportes (category_id = 4)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Balón Fútbol', 'Balón profesional FIFA', 34.99, 80, 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400', 4),
('Raqueta Tenis', 'Raqueta profesional Wilson', 129.99, 25, 'https://images.unsplash.com/photo-1617083279720-fac3926089ad?w=400', 4),
('Bicicleta MTB', 'Bicicleta montaña 21 velocidades', 449.99, 15, 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', 4),
('Pesas Ajustables', 'Set de pesas 20kg', 69.99, 40, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', 4),
('Cuerda Saltar', 'Cuerda para saltar profesional', 12.99, 150, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', 4),
('Esterilla Yoga', 'Esterilla antideslizante', 24.99, 90, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 4)
ON DUPLICATE KEY UPDATE category_id=4;

-- Hogar (category_id = 5)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Lámpara LED', 'Lámpara escritorio regulable', 39.99, 70, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', 5),
('Almohada Memory', 'Almohada viscoelástica', 49.99, 90, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', 5),
('Juego Sábanas', 'Sábanas algodón egipcio', 79.99, 55, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', 5),
('Espejo Decorativo', 'Espejo de pared moderno', 89.99, 30, 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400', 5),
('Reloj Pared', 'Reloj silencioso decorativo', 34.99, 65, 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', 5)
ON DUPLICATE KEY UPDATE category_id=5;

-- Libros (category_id = 6)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('El Quijote', 'Edición completa ilustrada', 29.99, 50, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 6),
('Sapiens', 'Libro de Yuval Noah Harari', 24.99, 60, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400', 6),
('Harry Potter', 'Colección completa 7 libros', 89.99, 35, 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400', 6),
('Cien Años Soledad', 'Gabriel García Márquez', 19.99, 70, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 6),
('El Principito', 'Edición ilustrada', 15.99, 100, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400', 6)
ON DUPLICATE KEY UPDATE category_id=6;

-- Verificar que todos los productos tienen categoría asignada
SELECT 
    c.name as categoria, 
    COUNT(p.id) as total_productos 
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY c.id;
