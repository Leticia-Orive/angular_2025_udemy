import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0, itemCount: 0 };
  isAuthenticated = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });

    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(productId);
      return;
    }
    this.cartService.updateQuantity(productId, newQuantity);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
      return;
    }

    // Aquí implementarías la lógica de checkout real
    alert('¡Gracias por tu compra! (Funcionalidad de pago simulada)');
    this.clearCart();
    this.router.navigate(['/shop']);
  }

  continueShopping(): void {
    this.router.navigate(['/shop']);
  }

  trackByProductId(index: number, item: CartItem): string {
    return item.product.id;
  }
}
