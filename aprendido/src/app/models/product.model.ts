/**
 * MODELOS DE PRODUCTO
 * 
 * Este archivo define todas las interfaces relacionadas con los productos
 * de la tienda, incluyendo operaciones CRUD (crear, leer, actualizar).
 */

/**
 * INTERFACE: Modelo completo de producto
 * 
 * Define la estructura de datos de un producto en la tienda.
 * Incluye toda la información necesaria para mostrar y gestionar productos.
 */
export interface Product {
  id: string;           // Identificador único del producto
  name: string;         // Nombre del producto
  description: string;  // Descripción detallada del producto
  price: number;        // Precio del producto (en la moneda base)
  imageUrl: string;     // URL de la imagen del producto
  category: string;     // Categoría a la que pertenece el producto
  stock: number;        // Cantidad disponible en inventario
  createdAt: Date;      // Fecha de creación del producto
}

/**
 * INTERFACE: Datos requeridos para crear un nuevo producto
 * 
 * Define la estructura de datos que el administrador debe proporcionar
 * para añadir un nuevo producto al catálogo.
 * 
 * Nota: No incluye 'id' ni 'createdAt' porque se generan automáticamente.
 */
export interface CreateProductRequest {
  name: string;         // Nombre del nuevo producto
  description: string;  // Descripción del producto
  price: number;        // Precio de venta
  imageUrl: string;     // URL de la imagen del producto
  category: string;     // Categoría del producto
  stock: number;        // Cantidad inicial en stock
}

/**
 * INTERFACE: Datos para actualizar un producto existente
 * 
 * Extiende CreateProductRequest pero hace todos los campos opcionales
 * excepto el ID, permitiendo actualizaciones parciales.
 * 
 * Uso: Permite modificar solo los campos que se deseen cambiar.
 */
export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;  // ID del producto a actualizar (requerido)
}
