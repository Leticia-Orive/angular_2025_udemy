/**
 * SERVICIO CART (CARRITO DE COMPRAS)
 * ===================================
 *
 * Funcionalidad:
 * - Gestiona el carrito de compras con persistencia en localStorage
 * - Carrito específico por usuario (cada email tiene su propio carrito)
 * - Estado reactivo con RxJS BehaviorSubject
 * - Sincronización automática al cambiar de usuario (login/logout)
 *
 * Características principales:
 * - Persistencia: localStorage con clave por usuario (cart_email@user.com)
 * - Carrito invitado: cart_guest para usuarios no autenticados
 * - Cambio automático: Al hacer login/logout carga el carrito correspondiente
 * - Estado reactivo: cartItems$ observable para actualizar UI
 *
 * Interface CartItem:
 * - product: Objeto Product completo
 * - quantity: Cantidad de unidades del producto
 *
 * Métodos principales:
 * - addToCart(product, quantity): Agrega producto o suma cantidad si ya existe
 * - removeFromCart(productId): Elimina producto del carrito
 * - updateQuantity(productId, quantity): Cambia cantidad (elimina si quantity < 1)
 * - clearCart(): Vacía completamente el carrito
 * - getTotalPrice(): Calcula precio total (suma de product.price * quantity)
 * - getTotalItems(): Cuenta total de productos (suma de quantities)
 *
 * Sistema de claves localStorage:
 * - Usuario autenticado: `cart_${email}` (ej: cart_user@example.com)
 * - Usuario invitado: 'cart_guest'
 * - Ventajas: Múltiples usuarios pueden usar el navegador con carritos separados
 *
 * Sincronización con AuthService:
 * - Se suscribe a authService.currentUser$ en el constructor
 * - Detecta cambio de usuario (login/logout/cambio de cuenta)
 * - Carga automáticamente el carrito del nuevo usuario
 * - Beneficio: Carrito persiste entre sesiones para cada usuario
 *
 * Manejo de errores:
 * - Try-catch al cargar desde localStorage (por si datos corruptos)
 * - Limpia datos corruptos automáticamente
 * - Retorna array vacío si no hay carrito o hay error
 *
 * Flujo de persistencia:
 * 1. Operación (add/remove/update/clear)
 * 2. Actualiza cartItems BehaviorSubject
 * 3. Guarda en localStorage con clave del usuario actual
 * 4. UI se actualiza automáticamente por cartItems$ observable
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  private currentUserEmail: string | null = null;

  constructor(private authService: AuthService) {
    // Cargar carrito del usuario actual al iniciar
    this.initializeCart();

    // Suscribirse a cambios de usuario
    this.authService.currentUser$.subscribe(user => {
      if (user?.email !== this.currentUserEmail) {
        this.currentUserEmail = user?.email || null;
        this.loadCartForCurrentUser();
      }
    });
  }

  private initializeCart(): void {
    const user = this.authService.getCurrentUser();
    this.currentUserEmail = user?.email || null;
    this.loadCartForCurrentUser();
  }

  private getCartKey(): string {
    // Si hay usuario, usar su email; si no, usar clave genérica para invitados
    return this.currentUserEmail ? `cart_${this.currentUserEmail}` : 'cart_guest';
  }

  private loadCartForCurrentUser(): void {
    const items = this.loadCartFromStorage();
    this.cartItems.next(items);
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const cartKey = this.getCartKey();
      const cart = localStorage.getItem(cartKey);
      if (cart) {
        const parsed = JSON.parse(cart);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error('Error al cargar carrito desde localStorage:', error);
      const cartKey = this.getCartKey();
      localStorage.removeItem(cartKey); // Limpiar datos corruptos
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    try {
      const cartKey = this.getCartKey();
      localStorage.setItem(cartKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error al guardar carrito en localStorage:', error);
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    const cartKey = this.getCartKey();
    localStorage.removeItem(cartKey);
  }

  addToCart(product: Product, quantity: number = 1): void {
    try {
      console.log('addToCart llamado con:', product, quantity);

      // Obtener items actuales de forma segura
      let currentItems: CartItem[] = [];
      try {
        currentItems = [...this.cartItems.value];
      } catch (e) {
        console.error('Error al obtener items actuales, usando array vacío');
        currentItems = [];
      }

      console.log('Items actuales:', currentItems);

      const existingItem = currentItems.find(item => item.product.id === product.id);

      if (existingItem) {
        console.log('Producto ya existe, incrementando cantidad');
        existingItem.quantity += quantity;
      } else {
        console.log('Nuevo producto, agregando al carrito');
        currentItems.push({ product: { ...product }, quantity });
      }

      console.log('Actualizando carrito con:', currentItems);
      this.cartItems.next(currentItems);
      this.saveCartToStorage(currentItems);
      console.log('Carrito actualizado exitosamente');
    } catch (error) {
      console.error('Error crítico en addToCart:', error);
      throw error;
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter(
      item => item.product.id !== productId
    );
    this.cartItems.next(currentItems);
    this.saveCartToStorage(currentItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = [...this.cartItems.value]; // Crear una copia del array
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartItems.next(currentItems);
        this.saveCartToStorage(currentItems);
      }
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }
}
