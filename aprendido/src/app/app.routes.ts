/**
 * CONFIGURACIÓN DE RUTAS DE LA APLICACIÓN
 * 
 * Este archivo define todas las rutas navegables de la aplicación.
 * Cada ruta especifica qué componente debe mostrarse para una URL específica.
 * 
 * Rutas configuradas:
 * - /shop: Tienda principal (ruta por defecto)
 * - /login: Formulario de inicio de sesión
 * - /register: Formulario de registro
 * - /cart: Carrito de compras
 * - /admin: Panel de administración (protegido con guards)
 * 
 * Guards implementados:
 * - authGuard: Verifica que el usuario esté autenticado
 * - adminGuard: Verifica que el usuario tenga permisos de administrador
 */

import { Routes } from '@angular/router';

// Importación de componentes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';

// Importación de guards de protección de rutas
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

// Definición de las rutas de la aplicación
export const routes: Routes = [
  // Ruta raíz: redirige automáticamente a la tienda
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  
  // Rutas de autenticación
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Rutas principales de la aplicación
  { path: 'shop', component: ShopComponent },      // Tienda de productos
  { path: 'cart', component: CartComponent },      // Carrito de compras
  
  // Ruta protegida para administradores
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard]  // Requiere autenticación Y permisos de admin
  },
  
  // Ruta comodín: cualquier URL no reconocida redirige a la tienda
  { path: '**', redirectTo: '/shop' }
];
