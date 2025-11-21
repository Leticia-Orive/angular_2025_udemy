/**
 * MODELO CATEGORY (CATEGORÍA)
 * ============================
 *
 * Interface TypeScript que define la estructura de una categoría de productos.
 *
 * Propiedades:
 * - id: number - Identificador único (requerido, AUTO_INCREMENT en MySQL)
 * - name: string - Nombre de la categoría (requerido, ej: "Electrónica")
 * - description?: string - Descripción de la categoría (opcional)
 * - icon?: string - Emoji o icono representativo (opcional, ej: "💻")
 * - created_at?: Date - Fecha de creación (generada por MySQL)
 * - updated_at?: Date - Fecha de última actualización (generada por MySQL)
 *
 * Categorías actuales en el sistema:
 * - ID 1: Electrónica 💻
 * - ID 2: Ropa 👕
 * - ID 3: Alimentos 🍕
 * - ID 4: Deportes ⚽
 * - ID 5: Hogar 🏠
 * - ID 6: Libros 📚
 *
 * Nota técnica sobre iconos:
 * - El campo icon puede contener emojis (requiere charset UTF8MB4 en MySQL)
 * - Problema conocido: Emojis pueden aparecer corruptos ("????") debido a encoding
 * - Solución implementada: Mapeo hardcodeado por ID en componentes
 * - Los componentes usan getCategoryIcon() con fallback en 3 niveles
 *
 * Relación con base de datos:
 * - Tabla: categories
 * - Relación 1:N con products (category_id)
 * - LEFT JOIN en consultas de productos para incluir category_name
 *
 * Uso:
 * - CategoryService: Tipo de datos para peticiones HTTP
 * - CategoriesComponent: Grid de categorías clickeables
 * - CategoryProductsComponent: Header con info de categoría
 * - ProductsComponent: Selector de categoría al crear/editar producto
 */

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  created_at?: Date;
  updated_at?: Date;
}
