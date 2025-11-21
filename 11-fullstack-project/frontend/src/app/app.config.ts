/**
 * CONFIGURACIÓN PRINCIPAL DE LA APLICACIÓN ANGULAR
 * =================================================
 *
 * Funcionalidad:
 * - Define la configuración global de la aplicación Angular 19
 * - Configura proveedores (providers) a nivel de aplicación
 * - Habilita funcionalidades core de Angular y módulos externos
 *
 * Proveedores configurados:
 *
 * 1. provideZoneChangeDetection({ eventCoalescing: true })
 *    - Optimiza la detección de cambios de Angular
 *    - eventCoalescing: Agrupa múltiples eventos en un solo ciclo de detección
 *    - Mejora el rendimiento al reducir ciclos de change detection innecesarios
 *
 * 2. provideRouter(routes)
 *    - Habilita el sistema de rutas de Angular
 *    - Importa configuración de rutas desde app.routes.ts
 *    - Permite navegación SPA (Single Page Application)
 *    - Rutas definidas: /, /products, /categories, /category/:id, /users, /login, /register, /cart
 *
 * 3. provideHttpClient()
 *    - Configura HttpClient para peticiones HTTP
 *    - Permite comunicación con backend REST API (localhost:3000)
 *    - Usado por todos los servicios (ProductService, AuthService, etc.)
 *    - Reemplaza el antiguo HttpClientModule (Angular 15+)
 *
 * Arquitectura standalone:
 * - Angular 19 usa standalone components (sin NgModules)
 * - Configuración centralizada en este archivo
 * - Components importan directamente lo que necesitan
 * - Providers se inyectan a nivel de root
 *
 * Uso:
 * - main.ts importa appConfig para bootstrapApplication()
 * - Todos los servicios inyectables usan estos proveedores
 * - Configuración única compartida por toda la aplicación
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
