/**
 * COMPONENTE DEL CARRITO DE COMPRAS
 *
 * Este componente maneja la visualización y gestión del carrito de compras.
 * Permite a los usuarios ver items agregados, modificar cantidades y proceder al checkout.
 *
 * Funcionalidades:
 * - Mostrar items del carrito con detalles
 * - Modificar cantidades de productos
 * - Eliminar items del carrito
 * - Limpiar todo el carrito
 * - Proceder al checkout (con verificación de autenticación)
 * - Navegación de regreso a la tienda
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',              // Selector para usar el componente en templates
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  // PROPIEDADES DEL COMPONENTE

  cart: Cart = { items: [], total: 0, itemCount: 0 };    // Estado actual del carrito
  isAuthenticated = false;                                // Estado de autenticación del usuario

  // CONSTRUCTOR - Inyección de dependencias
  constructor(
    private cartService: CartService,    // Servicio para gestionar el carrito
    private authService: AuthService,    // Servicio de autenticación
    private router: Router               // Servicio de navegación
  ) {}

  // HOOK DE CICLO DE VIDA - Se ejecuta después de inicializar el componente
  ngOnInit(): void {
    // Suscribirse a los cambios del carrito
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });

    // Suscribirse a los cambios del estado de autenticación
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  // MÉTODOS DE GESTIÓN DEL CARRITO

  // Método público para actualizar la cantidad de un producto
  updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(productId);    // Si la cantidad es menor a 1, eliminar el item
      return;
    }
    this.cartService.updateQuantity(productId, newQuantity);
  }

  // Método público para eliminar un item específico del carrito
  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  // Método público para vaciar completamente el carrito
  clearCart(): void {
    this.cartService.clearCart();
  }

  // MÉTODOS DE NAVEGACIÓN Y CHECKOUT

  // Método público para proceder al proceso de checkout
  proceedToCheckout(): void {
    if (!this.isAuthenticated) {
      // Si no está autenticado, redirigir al login con URL de retorno
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
      return;
    }

    // Aquí implementarías la lógica de checkout real
    alert('¡Gracias por tu compra! (Funcionalidad de pago simulada)');
    this.clearCart();
    this.router.navigate(['/shop']);
  }

  // Método público para volver a la tienda
  continueShopping(): void {
    this.router.navigate(['/shop']);
  }

  // MÉTODOS DE UTILIDAD

  // Función de tracking para optimizar el rendimiento de *ngFor
  trackByProductId(index: number, item: CartItem): string {
    return item.product.id;
  }
}
