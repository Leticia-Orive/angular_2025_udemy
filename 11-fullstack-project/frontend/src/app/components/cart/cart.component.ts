/**
 * COMPONENTE CART (CARRITO DE COMPRAS)
 * =====================================
 *
 * Funcionalidad:
 * - Muestra el carrito de compras con productos agregados
 * - Permite modificar cantidades, eliminar productos y vaciar carrito
 * - Calcula totales, descuentos y puntos de fidelidad
 * - Implementa proceso de pago con modal y múltiples métodos
 *
 * Características principales:
 * - Descuento del 10% para usuarios registrados
 * - Sistema de puntos: 5 puntos por cada dólar gastado
 * - Carrito específico por usuario (usa email como identificador)
 * - Persistencia en localStorage
 *
 * Sistema de pago:
 * - Modal con tres métodos: Tarjeta de crédito, débito y Bizum
 * - Validación de campos según método seleccionado
 * - Tarjetas: número (16 dígitos), titular, fecha (MM/AA), CVV (3-4 dígitos)
 * - Bizum: teléfono (9 dígitos)
 * - Formateo automático de número de tarjeta (#### #### #### ####)
 * - Formateo de fecha de expiración (MM/AA)
 *
 * Métodos principales:
 * - calculateTotals(): Calcula precio total, descuento y puntos
 * - increaseQuantity/decreaseQuantity(): Modifica cantidad de productos
 * - removeItem(): Elimina producto del carrito
 * - clearCart(): Vacía el carrito completo
 * - checkout(): Abre modal de pago
 * - processPayment(): Valida y procesa el pago según método elegido
 * - formatCardNumber(): Formatea número de tarjeta con espacios
 * - formatExpiryDate(): Formatea fecha como MM/AA
 *
 * Beneficios para usuarios registrados:
 * - DISCOUNT_PERCENTAGE: 10% de descuento sobre el total
 * - POINTS_PER_DOLLAR: 5 puntos de fidelidad por cada dólar
 *
 * Dependencias:
 * - CartService: Gestiona estado del carrito (add, remove, update)
 * - AuthService: Verifica estado de autenticación para beneficios
 * - FormsModule: Para formulario de pago con ngModel
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalItems = 0;
  discount = 0;
  pointsEarned = 0;
  finalPrice = 0;

  // Configuración de beneficios
  DISCOUNT_PERCENTAGE = 10; // 10% de descuento para usuarios registrados
  POINTS_PER_DOLLAR = 5; // 5 puntos por cada dólar gastado

  // Modal de pago
  showPaymentModal = false;
  paymentData = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit',
    bizumPhone: ''
  };

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalItems = this.cartService.getTotalItems();

    // Calcular descuento solo para usuarios registrados
    if (this.authService.isLoggedIn()) {
      this.discount = (this.totalPrice * this.DISCOUNT_PERCENTAGE) / 100;
      this.finalPrice = this.totalPrice - this.discount;
      this.pointsEarned = Math.floor(this.finalPrice * this.POINTS_PER_DOLLAR);
    } else {
      this.discount = 0;
      this.finalPrice = this.totalPrice;
      this.pointsEarned = 0;
    }
  }

  increaseQuantity(productId: number, currentQuantity: number) {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: number, currentQuantity: number) {
    this.cartService.updateQuantity(productId, currentQuantity - 1);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
    this.resetPaymentForm();
  }

  resetPaymentForm() {
    this.paymentData = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      paymentMethod: 'credit',
      bizumPhone: ''
    };
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.paymentData.cardNumber = formattedValue;
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.paymentData.expiryDate = value;
  }

  processPayment() {
    // Validaciones según método de pago
    if (this.paymentData.paymentMethod === 'bizum') {
      if (!this.paymentData.bizumPhone || this.paymentData.bizumPhone.length < 9) {
        alert('Por favor ingresa un número de teléfono válido para Bizum');
        return;
      }
    } else {
      // Validaciones para tarjetas
      if (!this.paymentData.cardNumber || this.paymentData.cardNumber.replace(/\s/g, '').length < 16) {
        alert('Por favor ingresa un número de tarjeta válido');
        return;
      }

      if (!this.paymentData.cardHolder) {
        alert('Por favor ingresa el titular de la tarjeta');
        return;
      }

      if (!this.paymentData.expiryDate || this.paymentData.expiryDate.length < 5) {
        alert('Por favor ingresa una fecha de vencimiento válida');
        return;
      }

      if (!this.paymentData.cvv || this.paymentData.cvv.length < 3) {
        alert('Por favor ingresa un CVV válido');
        return;
      }
    }

    // Simular procesamiento de pago
    let message = `✅ ¡Pago procesado exitosamente!\n\n`;

    if (this.paymentData.paymentMethod === 'bizum') {
      message += `Método: 📱 Bizum\n`;
      message += `Teléfono: ${this.paymentData.bizumPhone}\n`;
    } else {
      const methodName = this.paymentData.paymentMethod === 'credit' ? 'Tarjeta de Crédito' : 'Tarjeta de Débito';
      message += `Método: ${methodName}\n`;
      message += `Tarjeta: **** **** **** ${this.paymentData.cardNumber.slice(-4)}\n`;
    }

    message += `Monto: $${this.finalPrice.toFixed(2)}\n`;

    if (this.authService.isLoggedIn()) {
      message += `\n🎁 Has ganado ${this.pointsEarned} puntos de recompensa`;
    }

    alert(message);
    this.cartService.clearCart();
    this.closePaymentModal();
  }
}
