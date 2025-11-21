/**
 * CONFIGURACIÓN DE RUTAS DE LA APLICACIÓN
 * ========================================
 *
 * Funcionalidad:
 * - Define todas las rutas (URLs) de la aplicación SPA
 * - Mapea cada ruta a su componente correspondiente
 * - Permite navegación sin recargar la página
 *
 * Rutas públicas (accesibles sin autenticación):
 * - '/' → HomeComponent: Página de inicio/bienvenida
 * - '/login' → LoginComponent: Formulario de inicio de sesión
 * - '/register' → RegisterComponent: Formulario de registro
 * - '/categories' → CategoriesComponent: Grid de categorías de productos
 * - '/products' → ProductsComponent: Listado de productos (CRUD para admin)
 * - '/cart' → CartComponent: Carrito de compras con checkout
 *
 * Rutas dinámicas:
 * - '/category/:id' → CategoryProductsComponent: Productos filtrados por categoría
 *   · Parámetro :id capturado con ActivatedRoute
 *   · Ejemplo: /category/1 muestra productos de Electrónica
 *
 * Rutas restringidas (solo admin):
 * - '/users' → UsersComponent: Gestión de usuarios
 *   · Nota: Oculta en navegación para usuarios no admin
 *   · Recomendación: Agregar AuthGuard en producción
 *
 * Ruta fallback:
 * - '**' → redirectTo: '' - Redirige rutas no encontradas al inicio
 *   · Captura cualquier URL no definida (404)
 *   · Evita errores al escribir URLs manualmente
 *
 * Arquitectura:
 * - Angular Router con standalone components
 * - Sin lazy loading (carga todos los componentes al inicio)
 * - RouterLink en templates para navegación declarativa
 * - Router.navigate() en componentes para navegación programática
 *
 * Mejoras futuras recomendadas:
 * - AuthGuard para proteger rutas admin
 * - Lazy loading para mejorar tiempo de carga inicial
 * - Resolver guards para pre-cargar datos
 * - CanDeactivate guards para prevenir pérdida de datos en formularios
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];
