// COMPONENTE DE MENÚ LATERAL DE NAVEGACIÓN
// Genera automáticamente los enlaces de navegación basándose en las rutas configuradas
// Proporciona una interfaz consistente para navegar entre módulos
import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/pages/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

// INTERFAZ para tipado fuerte de elementos del menú
interface MenuItem {
  title: string;  // Texto visible en el menú
  route: string;  // Ruta de navegación
}

// Extracción de rutas hijas del módulo reactive para generación automática del menú
const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,        // Directiva para navegación programática
    RouterLinkActive   // Directiva para destacar el enlace activo
  ],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  // MENÚ REACTIVE: Generado automáticamente desde las rutas del módulo
  // Filtra rutas wildcard (**) y transforma la configuración en elementos de menú
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')  // Excluir rutas de fallback
    .map((item) => ({
      route: `reactive/${item.path}`,  // Construir ruta completa
      title: `${item.title}`,          // Usar título definido en las rutas
    }));

  // MENÚ AUTH: Enlaces estáticos para módulo de autenticación
  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth'  // Ruta relativa al módulo auth
  }];

  // MENÚ COUNTRY: Enlaces estáticos para módulo de países
  countryMenu: MenuItem[] = [{
    title: 'Países',
    route: './country'  // Ruta relativa al módulo country
  }];
}
