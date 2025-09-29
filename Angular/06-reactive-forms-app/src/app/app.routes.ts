// CONFIGURACIÓN DE RUTAS PRINCIPALES DE LA APLICACIÓN
// Sistema de enrutamiento modular con lazy loading para optimizar rendimiento
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // MÓDULO REACTIVE: Formularios reactivos básicos, dinámicos y switches
    // URL: /reactive/basic, /reactive/dynamic, /reactive/switches
    path: 'reactive',
    loadChildren: () => import('./reactive/pages/reactive.routes').then((m) => m.reactiveRoutes)
  },
  {
    // MÓDULO AUTH: Autenticación y registro de usuarios
    // URL: /auth/register
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    // MÓDULO COUNTRY: Selección en cascada de países y fronteras
    // URL: /country
    path: 'country',
    loadChildren: () => import('./country/country.routes').then((m) => m.countryRoutes)
  },
  {
    // RUTA WILDCARD: Cualquier ruta no definida redirige a reactive
    // Esto actúa como página de inicio por defecto
    path: '**',
    redirectTo: 'reactive'
  }
];
