// CONFIGURACIÓN PRINCIPAL DE LA APLICACIÓN
// Este archivo configura todos los providers globales de la aplicación
// Reemplaza al tradicional app.module.ts en aplicaciones standalone
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Manejo global de errores del navegador
    provideBrowserGlobalErrorListeners(),

    // Configuración de detección de cambios con optimización
    // eventCoalescing: true -> Agrupa múltiples eventos para mejor rendimiento
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Sistema de enrutamiento con las rutas definidas en app.routes.ts
    provideRouter(routes),

    // Cliente HTTP con fetch API nativo (más moderno que XMLHttpRequest)
    // Necesario para consumir la API REST Countries en el módulo country
    provideHttpClient(withFetch()),
  ]
};
