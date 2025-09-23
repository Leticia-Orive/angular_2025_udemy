/**
 * GUARD DE ADMINISTRADOR
 *
 * Esta función guard protege rutas que requieren permisos de administrador.
 * Verifica que el usuario esté autenticado Y que tenga rol de ADMIN.
 * Si no cumple ambas condiciones, lo redirige a la página principal.
 *
 * Uso: Se aplica en rutas administrativas como /admin para restringir acceso
 * solo a usuarios con privilegios de administrador.
 *
 * @param route - Información de la ruta activada
 * @param state - Estado del router con la URL actual
 * @returns true si el usuario es admin autenticado, false en caso contrario
 */

import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// GUARD FUNCIONAL - Protege rutas que requieren permisos de administrador
export const adminGuard: CanActivateFn = (route, state) => {
  // Inyección de dependencias usando la nueva sintaxis de Angular
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar doble condición: estar autenticado Y ser administrador
  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;    // Permitir acceso a la ruta administrativa
  } else {
    // Redirigir a página principal si no tiene permisos
    router.navigate(['/']);
    return false;   // Denegar acceso a la ruta
  }
};
