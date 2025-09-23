/**
 * PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN ANGULAR
 * 
 * Este archivo es el punto de arranque de la aplicación. Se ejecuta cuando
 * la aplicación se carga en el navegador y es responsable de:
 * 1. Inicializar la aplicación Angular
 * 2. Cargar la configuración principal
 * 3. Montar el componente raíz en el DOM
 */

// Importación de la función para inicializar aplicaciones Angular standalone
import { bootstrapApplication } from '@angular/platform-browser';

// Configuración principal de la aplicación (providers, routing, etc.)
import { appConfig } from './app/app.config';

// Componente raíz de la aplicación
import { AppComponent } from './app/app.component';

// Inicialización de la aplicación Angular
// bootstrapApplication es el método moderno para aplicaciones standalone (sin NgModule)
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Captura y muestra errores de inicialización
