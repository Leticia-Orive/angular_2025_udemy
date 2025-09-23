/**
 * GUARD DE AUTENTICACIÓN
 *
 * Esta función guard protege rutas que requieren que el usuario esté autenticado.
 * Si el usuario no ha iniciado sesión, lo redirige automáticamente a la página de login
 * guardando la URL de destino para redirección posterior.
 *
 * Uso: Se aplica en las rutas del archivo app.routes.ts para proteger páginas privadas.
 *
 * @param route - Información de la ruta activada
 * @param state - Estado del router con la URL actual
 * @returns true si el usuario está autenticado, false si necesita login
 */

import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// GUARD FUNCIONAL - Protege rutas que requieren autenticación
export const authGuard: CanActivateFn = (route, state) => {
  // Inyección de dependencias usando la nueva sintaxis de Angular
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true;    // Permitir acceso a la ruta
  } else {
    // Redirigir al login guardando la URL de destino para después del login exitoso
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;   // Denegar acceso a la ruta
  }
};
