// Importaciones necesarias para el funcionamiento del componente
import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes'; // Rutas de la aplicación definidas en app.routes.ts
import { NavigationEnd, Router, RouterLink } from '@angular/router'; // Herramientas de navegación de Angular
import {  filter, map, tap } from 'rxjs'; // Operadores RxJS para manipular observables
import { AsyncPipe } from '@angular/common'; // Pipe para suscribirse a observables en el template
import { toSignal } from '@angular/core/rxjs-interop'; // Función para convertir observables a signals

/**
 * Componente NavbarComponent
 *
 * PROPÓSITO:
 * Este componente representa la barra de navegación principal de la aplicación de mapas.
 * Proporciona navegación entre diferentes páginas y muestra dinámicamente el título
 * de la página actual.
 *
 * FUNCIONALIDADES:
 * - Genera automáticamente un menú desplegable con todas las rutas disponibles
 * - Muestra el título de la página actual que cambia según la ruta activa
 * - Incluye botones decorativos de búsqueda y notificaciones
 * - Utiliza DaisyUI para el estilo visual
 *
 * USO:
 * Se utiliza como componente compartido en toda la aplicación para mantener
 * una navegación consistente entre las diferentes páginas de mapas.
 */
@Component({
  selector: 'app-navbar', // Selector para usar el componente: <app-navbar></app-navbar>
  imports: [AsyncPipe, RouterLink], // Dependencias necesarias para el funcionamiento
  templateUrl: './navbar.component.html', // Plantilla HTML del componente

})
export class NavbarComponent {
  // Inyección del servicio Router para manejar la navegación
  router = inject(Router);

  /**
   * Procesamiento de rutas para el menú de navegación
   *
   * QUÉ HACE:
   * - Toma todas las rutas definidas en la aplicación
   * - Las transforma para incluir solo path y title
   * - Filtra la ruta comodín '**' (ruta 404) para no mostrarla en el menú
   * - Proporciona un título por defecto si no está definido
   *
   * RESULTADO:
   * Un array de objetos con {path, title} que se usa para generar
   * los enlaces de navegación en el menú desplegable
   */
  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular'}`, // Título por defecto si no existe
  }))
  .filter(route => route.path !== '**'); // Excluye la ruta catch-all

  /**
   * Observable que emite el título de la página actual
   *
   * CÓMO FUNCIONA:
   * 1. Escucha todos los eventos del router
   * 2. Filtra solo los eventos NavigationEnd (cuando termina la navegación)
   * 3. Extrae la URL actual del evento
   * 4. Busca en las rutas cuál coincide con la URL actual
   * 5. Devuelve el título de esa ruta o 'Mapas' por defecto
   *
   * USO EN TEMPLATE:
   * Se usa con el pipe async: {{ pageTitle$ | async }}
   */
  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd), // Solo eventos de navegación completada
    tap((event: NavigationEnd) => console.log({ event })), // Log para debug
    map((event) => event.url), // Extrae la URL del evento
    map( url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas') // Busca el título correspondiente
  );

  /**
   * Signal que contiene el título de la página actual
   *
   * QUÉ ES:
   * Una versión alternativa de pageTitle$ convertida a Signal usando toSignal()
   * Los signals son la nueva forma reactiva de Angular (v16+)
   *
   * VENTAJAS DE SIGNALS:
   * - Mejor rendimiento que los observables en algunos casos
   * - Sintaxis más simple en el template: {{ pageTitle() }}
   * - Mejor integración con el sistema de detección de cambios
   *
   * NOTA: Actualmente comentado en el template, se usa pageTitle$ en su lugar
   */
   pageTitle = toSignal(
    this.router.events.pipe(
    filter(event => event instanceof NavigationEnd), // Solo eventos de navegación completada
    tap((event: NavigationEnd) => console.log({ event })), // Log para debug
    map((event) => event.url), // Extrae la URL del evento
    map( url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas') // Busca el título correspondiente
  ));
}
