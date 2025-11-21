# Sistema de Categorías

## 📋 Descripción

El sistema de categorías permite organizar los productos en diferentes grupos temáticos, facilitando la navegación y búsqueda de productos.

## 🗂️ Categorías Disponibles

1. **💻 Electrónica** - Dispositivos electrónicos y accesorios
2. **👕 Ropa** - Ropa y accesorios de moda
3. **🍕 Alimentos** - Alimentos y bebidas
4. **⚽ Deportes** - Artículos deportivos y fitness
5. **🏠 Hogar** - Artículos para el hogar y decoración
6. **📚 Libros** - Libros y material educativo

## 🚀 Implementación

### Base de Datos

Se ha agregado la tabla `categories` con los siguientes campos:
- `id` - Identificador único
- `name` - Nombre de la categoría
- `description` - Descripción de la categoría
- `icon` - Emoji o icono representativo
- `created_at` - Fecha de creación
- `updated_at` - Fecha de actualización

La tabla `products` ahora incluye:
- `category_id` - Relación con la categoría (Foreign Key)

### Rutas Frontend

- `/categories` - Lista de todas las categorías
- `/category/:id` - Productos de una categoría específica

### API Endpoints

#### Categorías
- `GET /api/categories` - Obtener todas las categorías
- `GET /api/categories/:id` - Obtener una categoría específica
- `GET /api/categories/:id/products` - Obtener productos de una categoría
- `POST /api/categories` - Crear nueva categoría (Admin)
- `PUT /api/categories/:id` - Actualizar categoría (Admin)
- `DELETE /api/categories/:id` - Eliminar categoría (Admin)

#### Productos
Los endpoints de productos ahora incluyen información de la categoría:
- `GET /api/products` - Incluye `category_name` en cada producto

## 📦 Instalación

### 1. Actualizar Base de Datos

Ejecuta uno de estos comandos según tu configuración:

**Opción A - Si schema.sql ya tiene las categorías:**
```powershell
Get-Content database\schema.sql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

**Opción B - Solo agregar categorías a DB existente:**
```powershell
Get-Content database\add_categories.sql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p fullstack_db
```

### 2. Reiniciar Backend

```powershell
cd backend
npm start
```

### 3. El Frontend se actualizará automáticamente

## 🎨 Componentes Creados

### Frontend
- `CategoriesComponent` - Lista de categorías
- `CategoryProductsComponent` - Productos por categoría
- `CategoryService` - Servicio para gestión de categorías

### Backend
- `categories.routes.js` - Rutas de la API de categorías

## 🔧 Funcionalidades

### Para Usuarios
- ✅ Ver todas las categorías disponibles
- ✅ Navegar por productos de cada categoría
- ✅ Agregar productos al carrito desde las categorías
- ✅ Acceso rápido a categorías desde la página de inicio

### Para Administradores
- ✅ Todas las funcionalidades de usuario
- ✅ Crear nuevas categorías
- ✅ Editar categorías existentes
- ✅ Eliminar categorías
- ✅ Asignar productos a categorías

## 📱 Responsive Design

Todos los componentes de categorías están optimizados para:
- 📱 Dispositivos móviles
- 💻 Tablets
- 🖥️ Pantallas de escritorio

## 🎯 Próximas Mejoras

- [ ] Filtros avanzados por categoría
- [ ] Subcategorías
- [ ] Búsqueda dentro de categoría
- [ ] Ordenamiento de productos
- [ ] Estadísticas por categoría
- [ ] Categorías destacadas

## 📝 Notas

- Las categorías eliminadas establecen `category_id = NULL` en los productos relacionados (ON DELETE SET NULL)
- Cada categoría tiene un emoji único para mejor identificación visual
- El sistema está preparado para escalabilidad futura
