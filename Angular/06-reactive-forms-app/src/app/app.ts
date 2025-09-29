// COMPONENTE RAÍZ DE LA APLICACIÓN
// Este es el componente principal que sirve como contenedor de toda la aplicación
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./shared/components/side-menu/side-menu.component";

@Component({
  selector: 'app-root',
  // Importaciones standalone: No necesita NgModule, se importan directamente
  imports: [
    RouterOutlet,      // Componente que renderiza las rutas activas
    SideMenuComponent  // Menú de navegación lateral compartido
  ],
  templateUrl: './app.html',    // Template HTML del layout principal
  styleUrl: './app.css'         // Estilos CSS del layout principal
})
export class App {
  // Signal que contiene el título de la aplicación
  // protected readonly: Solo accesible desde la clase y sus subclases, no modificable
  protected readonly title = signal('06-reactive-forms-app');
}
