/**
 * COMPONENTE HOME (PÁGINA DE INICIO)
 * ===================================
 *
 * Funcionalidad:
 * - Página principal que da la bienvenida a los usuarios
 * - Muestra información diferente según el estado de autenticación
 * - Proporciona navegación a las principales secciones
 *
 * Características:
 * - Acceso público (authService) para mostrar contenido personalizado
 * - RouterLink para navegación a productos y categorías
 * - CommonModule para directivas básicas de Angular
 *
 * Dependencias:
 * - AuthService: Para conocer el estado de autenticación del usuario
 * - RouterLink: Para enlaces de navegación dentro de la aplicación
 *
 * Template:
 * - home.component.html: Página de bienvenida con navegación principal
 * - home.component.css: Estilos de presentación y diseño
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
