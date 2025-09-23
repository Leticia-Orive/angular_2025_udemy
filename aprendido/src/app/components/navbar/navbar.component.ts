/**
 * COMPONENTE DE BARRA DE NAVEGACIÓN
 *
 * Este componente proporciona la navegación principal de la aplicación.
 * Se muestra en todas las páginas y contiene enlaces principales, información
 * del usuario actual y funcionalidades de logout.
 *
 * Funcionalidades:
 * - Mostrar información del usuario autenticado
 * - Enlaces de navegación principales
 * - Contador de items en el carrito
 * - Funcionalidad de logout
 * - Verificación de permisos de administrador
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-navbar',          // Selector para incluir la navbar en otros templates
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  // PROPIEDADES DEL COMPONENTE

  currentUser: Omit<User, 'password'> | null = null;    // Usuario actual (sin contraseña por seguridad)
  cartItemCount = 0;                                     // Contador de items en el carrito
  userRoles = UserRole;                                  // Enum de roles para usar en el template

  // CONSTRUCTOR - Inyección de dependencias
  constructor(
    private authService: AuthService,    // Servicio de autenticación
    private cartService: CartService,    // Servicio del carrito de compras
    private router: Router               // Servicio de navegación
  ) {}

  // HOOK DE CICLO DE VIDA - Se ejecuta después de inicializar el componente
  ngOnInit(): void {
    // Suscribirse a los cambios del usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Suscribirse a los cambios del carrito para actualizar el contador
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.itemCount;
    });
  }

  // MÉTODO PÚBLICO - Maneja el logout del usuario
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);    // Redirigir al login después del logout
  }

  // MÉTODO PÚBLICO - Verifica si el usuario actual es administrador
  isAdmin(): boolean {
    return this.currentUser?.role === UserRole.ADMIN;
  }
}
