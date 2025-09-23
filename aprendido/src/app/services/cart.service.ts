/**
 * SERVICIO DEL CARRITO DE COMPRAS
 * 
 * Este servicio maneja toda la lógica del carrito de compras, incluyendo:
 * - Agregar y quitar productos
 * - Actualizar cantidades
 * - Calcular totales
 * - Persistir datos en localStorage
 * - Proporcionar estado reactivo a los componentes
 * 
 * El carrito persiste entre sesiones del navegador y mantiene sincronizados
 * todos los componentes que muestran información del carrito.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'  // Singleton disponible en toda la aplicación
})
export class CartService {
  
  // ESTADO GLOBAL DEL CARRITO
  // BehaviorSubject mantiene el estado actual y notifica cambios a suscriptores
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],          // Lista vacía de productos
    total: 0,           // Total inicial en 0
    itemCount: 0        // Contador de items en 0
  });

  // Observable público para que componentes se suscriban a cambios del carrito
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    // RECUPERAR CARRITO PERSISTIDO al inicializar el servicio
    this.loadCartFromStorage();
  }

  /**
   * MÉTODO: Agregar producto al carrito
   * 
   * Si el producto ya existe, incrementa la cantidad.
   * Si es nuevo, lo agrega con la cantidad especificada.
   * 
   * @param product - Producto a agregar
   * @param quantity - Cantidad a agregar (por defecto 1)
   */
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex(item => item.product.id === product.id);

    let updatedItems: CartItem[];

    if (existingItemIndex > -1) {
      // PRODUCTO EXISTENTE: incrementar cantidad
      updatedItems = currentCart.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // PRODUCTO NUEVO: agregar al carrito
      updatedItems = [...currentCart.items, { product, quantity }];
    }

    // Actualizar carrito con los nuevos items
    this.updateCart(updatedItems);
  }

  /**
   * MÉTODO: Eliminar producto del carrito
   * 
   * Remueve completamente un producto del carrito independientemente de su cantidad.
   * 
   * @param productId - ID del producto a eliminar
   */
  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter(item => item.product.id !== productId);
    this.updateCart(updatedItems);
  }

  /**
   * MÉTODO: Actualizar cantidad de un producto
   * 
   * Cambia la cantidad de un producto específico en el carrito.
   * Si la cantidad es 0 o menor, elimina el producto.
   * 
   * @param productId - ID del producto a actualizar
   * @param quantity - Nueva cantidad (si ≤ 0, elimina el producto)
   */
  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    this.updateCart(updatedItems);
  }

  /**
   * MÉTODO: Vaciar carrito completamente
   * 
   * Elimina todos los productos del carrito y resetea totales.
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * MÉTODO: Obtener item específico del carrito
   * 
   * @param productId - ID del producto a buscar
   * @returns CartItem si existe, undefined si no está en el carrito
   */
  getCartItem(productId: string): CartItem | undefined {
    return this.cartSubject.value.items.find(item => item.product.id === productId);
  }

  /**
   * MÉTODO: Obtener total del carrito
   * 
   * @returns Precio total de todos los items del carrito
   */
  getCartTotal(): number {
    return this.cartSubject.value.total;
  }

  /**
   * MÉTODO: Obtener cantidad total de items
   * 
   * @returns Suma de las cantidades de todos los productos
   */
  getCartItemCount(): number {
    return this.cartSubject.value.itemCount;
  }

  /**
   * MÉTODO PRIVADO: Actualizar estado del carrito
   * 
   * Recalcula totales, actualiza el estado global y persiste en localStorage.
   * Este método centraliza toda la lógica de actualización del carrito.
   * 
   * @param items - Nueva lista de items del carrito
   */
  private updateCart(items: CartItem[]): void {
    // Calcular precio total (precio × cantidad para cada item)
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    // Calcular cantidad total de items
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Crear objeto carrito actualizado
    const updatedCart: Cart = {
      items,
      total,
      itemCount
    };

    // Actualizar estado global y notificar suscriptores
    this.cartSubject.next(updatedCart);
    
    // Persistir en localStorage para mantener entre sesiones
    this.saveCartToStorage(updatedCart);
  }

  /**
   * MÉTODO PRIVADO: Guardar carrito en localStorage
   * 
   * Persiste el estado actual del carrito en el almacenamiento local
   * del navegador para mantenerlo entre sesiones.
   * 
   * @param cart - Estado del carrito a guardar
   */
  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * MÉTODO PRIVADO: Cargar carrito desde localStorage
   * 
   * Recupera el carrito guardado al inicializar el servicio.
   * Incluye manejo de errores por si los datos están corruptos.
   */
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart: Cart = JSON.parse(savedCart);
        this.cartSubject.next(cart);
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        this.clearCart();
      }
    }
  }
}
