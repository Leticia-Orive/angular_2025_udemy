/**
 * MODELOS DEL CARRITO DE COMPRAS Y ÓRDENES
 * 
 * Este archivo define todas las interfaces relacionadas con el carrito de compras,
 * items del carrito y el procesamiento de órdenes de compra.
 */

import { Product } from './product.model';

/**
 * INTERFACE: Item individual del carrito
 * 
 * Representa un producto específico dentro del carrito de compras,
 * incluyendo la cantidad seleccionada por el usuario.
 */
export interface CartItem {
  product: Product;  // Información completa del producto
  quantity: number;  // Cantidad de este producto en el carrito
}

/**
 * INTERFACE: Carrito de compras completo
 * 
 * Representa el estado completo del carrito de un usuario,
 * incluyendo todos los items y cálculos totales.
 */
export interface Cart {
  items: CartItem[];    // Array de todos los items en el carrito
  total: number;        // Precio total de todos los items
  itemCount: number;    // Cantidad total de items (suma de todas las cantidades)
}

/**
 * INTERFACE: Orden de compra
 * 
 * Representa una orden/pedido realizada por un usuario.
 * Se crea cuando el usuario confirma su compra desde el carrito.
 */
export interface Order {
  id: string;                // Identificador único de la orden
  userId: string;            // ID del usuario que realizó la orden
  items: CartItem[];         // Items comprados (snapshot del carrito)
  total: number;             // Total pagado por la orden
  status: OrderStatus;       // Estado actual de la orden
  createdAt: Date;           // Fecha y hora de creación de la orden
}

/**
 * ENUM: Estados posibles de una orden
 * 
 * Define el ciclo de vida de una orden desde su creación hasta su entrega.
 * Permite el seguimiento del proceso de cumplimiento.
 */
export enum OrderStatus {
  PENDING = 'PENDING',        // Orden creada, pendiente de confirmación
  CONFIRMED = 'CONFIRMED',    // Orden confirmada y en proceso
  SHIPPED = 'SHIPPED',        // Orden enviada/despachada
  DELIVERED = 'DELIVERED',    // Orden entregada al cliente
  CANCELLED = 'CANCELLED'     // Orden cancelada
}
