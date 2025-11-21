/**
 * MODELO PRODUCT (PRODUCTO)
 * ==========================
 *
 * Interface TypeScript que define la estructura de un producto en la aplicación.
 *
 * Propiedades:
 * - id?: number - Identificador único, generado por MySQL (AUTO_INCREMENT)
 * - name: string - Nombre del producto (requerido)
 * - description: string - Descripción detallada del producto (requerido)
 * - price: number - Precio en formato decimal (requerido)
 * - stock: number - Cantidad disponible en inventario (requerido)
 * - image_url?: string - URL de la imagen del producto (opcional)
 * - category_id?: number - ID de la categoría a la que pertenece (opcional, FK)
 * - category_name?: string - Nombre de la categoría (solo lectura, viene del JOIN)
 * - created_at?: string - Fecha de creación (generada automáticamente por MySQL)
 * - updated_at?: string - Fecha de última actualización (generada por MySQL)
 *
 * Campos opcionales (?) vs requeridos:
 * - id, image_url, category_id, category_name: Opcionales al crear
 * - created_at, updated_at: Generados automáticamente por la base de datos
 * - name, description, price, stock: Requeridos en formularios
 *
 * Relación con base de datos:
 * - Tabla: products
 * - FK: category_id → categories.id (LEFT JOIN en consultas)
 * - category_name: No existe en tabla, viene del JOIN con categories
 *
 * Uso:
 * - ProductService: Tipo de datos para peticiones HTTP
 * - ProductsComponent: Formularios CRUD y listados
 * - CartService: Almacenamiento en CartItem { product: Product, quantity: number }
 * - CategoryProductsComponent: Filtrado por category_id
 */

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  category_id?: number;
  category_name?: string;
  created_at?: string;
  updated_at?: string;
}
