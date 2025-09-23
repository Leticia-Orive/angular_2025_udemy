/**
 * COMPONENTE RAÍZ DE LA APLICACIÓN
 * 
 * Este es el componente principal que contiene toda la aplicación.
 * Actúa como el contenedor base donde se renderizan todos los demás componentes.
 * 
 * Responsabilidades:
 * - Proporcionar la estructura base de la aplicación
 * - Incluir la barra de navegación común a todas las páginas
 * - Mostrar el contenido dinámico a través del router-outlet
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  // Selector utilizado para incluir este componente en el HTML
  selector: 'app-root',
  
  // Componentes que este componente puede utilizar
  imports: [RouterOutlet, NavbarComponent],
  
  // Plantilla HTML del componente
  templateUrl: './app.component.html',
  
  // Hoja de estilos específica del componente
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Título de la aplicación (puede usarse en el template)
  title = 'aprendido';
}
