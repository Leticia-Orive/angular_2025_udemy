// RUTAS DEL MÓDULO DE AUTENTICACIÓN
// Este módulo maneja registro de usuarios con validaciones complejas
import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        // REGISTRO DE USUARIOS: Formulario con validaciones avanzadas
        // URL: /auth/sign-up
        path: 'sign-up',
        component: RegisterPageComponent,
        // Aquí se pueden agregar guards, resolvers, etc.
      },
      {
        // RUTA POR DEFECTO: Redirige a registro si no se especifica subruta
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
]

// Export por defecto para lazy loading simplificado
export default authRoutes;
