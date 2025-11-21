/**
 * COMPONENTE RAÍZ DE LA APLICACIÓN
 * =================================
 *
 * Funcionalidad:
 * - Componente principal que contiene toda la aplicación Angular
 * - Muestra el navbar con navegación y estado de autenticación
 * - Gestiona el contador del carrito en tiempo real
 * - Controla visibilidad de enlaces según rol de usuario
 *
 * Características principales:
 * - RouterOutlet: Contenedor donde se renderizan los componentes de las rutas
 * - Navbar responsive con enlaces a todas las secciones
 * - Badge del carrito que muestra cantidad de productos
 * - Botones de login/register/logout según estado de autenticación
 * - Link "Usuarios" visible solo para administradores
 *
 * Estado reactivo:
 * - cartItemCount: Se actualiza automáticamente al cambiar el carrito
 *   · Suscripción a cartService.cartItems$
 *   · Muestra badge rojo con cantidad en icono del carrito
 *
 * - currentUser: Se actualiza al hacer login/logout
 *   · Suscripción a authService.currentUser$
 *   · Controla visibilidad de "Usuarios" (@if currentUser?.role === 'admin')
 *   · Muestra nombre del usuario en navbar
 *
 * Métodos:
 * - logout(): Cierra sesión y redirige al inicio
 *   · Llama a authService.logout() para limpiar localStorage
 *   · Navega a '/' usando Router
 *
 * Template (app.component.html):
 * - Navbar con RouterLink para navegación SPA
 * - @if/@else para mostrar contenido según autenticación
 * - RouterLinkActive para resaltar enlace activo
 * - RouterOutlet para renderizar componentes de rutas
 *
 * Estilo (app.component.css):
 * - Navbar sticky en la parte superior
 * - Diseño responsive con media queries
 * - Badge del carrito con posición absoluta
 * - Colores y espaciado consistentes
 *
 * Dependencias:
 * - CartService: Para obtener contador de productos en carrito
 * - AuthService: Para gestionar estado de autenticación
 * - Router: Para navegación programática (logout)
 * - CommonModule: Para directivas @if, @for
 */

import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from './services/cart.service';
import { AuthService, User } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  cartItemCount = 0;
  currentUser: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = this.cartService.getTotalItems();
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
