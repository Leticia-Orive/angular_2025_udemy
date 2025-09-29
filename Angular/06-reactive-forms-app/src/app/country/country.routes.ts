// Importaciones para el sistema de enrutamiento de Angular
import { Routes } from "@angular/router";
import { CountryPageComponent } from "./pages/country-page.component";

// Configuración de rutas para el módulo de países
// Estas rutas se cargan de forma lazy (solo cuando se necesitan)
// para mejorar el rendimiento de la aplicación
export const countryRoutes: Routes = [
  {
    path: '',                    // Ruta vacía - se activa cuando se navega a /country
    component: CountryPageComponent  // Componente que se renderiza para esta ruta
  },
  // Aquí se pueden agregar más rutas relacionadas con países:
  // { path: 'details/:code', component: CountryDetailsComponent },
  // { path: 'compare', component: CountryCompareComponent },
]
