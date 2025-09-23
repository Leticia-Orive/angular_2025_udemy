/**
 * CONFIGURACIÓN PRINCIPAL DE LA APLICACIÓN ANGULAR
 * 
 * Este archivo define la configuración global de la aplicación usando el nuevo
 * patrón de aplicaciones standalone (sin NgModule). Aquí se registran todos
 * los providers y servicios que estarán disponibles en toda la aplicación.
 * 
 * Configuraciones incluidas:
 * - Detección de cambios de Angular (Zone.js)
 * - Sistema de enrutamiento
 * - Otros providers globales de la aplicación
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importa la configuración de rutas de la aplicación
import { routes } from './app.routes';

// Configuración principal de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de la detección de cambios de Angular
    // eventCoalescing: true optimiza el rendimiento agrupando eventos relacionados
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    // Configuración del sistema de enrutamiento con las rutas definidas
    provideRouter(routes)
  ]
};
