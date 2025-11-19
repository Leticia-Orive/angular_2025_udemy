# 🚀 Proyecto Fullstack - Angular + Node.js + MySQL (Sin Docker)

Proyecto completo con frontend Angular, backend Node.js/Express y base de datos MySQL, configurado para ejecutarse localmente sin Docker.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **Angular CLI** (v19 o superior): `npm install -g @angular/cli`
- **MySQL** (v8.0 o superior) - [Descargar](https://dev.mysql.com/downloads/mysql/)

## 🗂️ Estructura del Proyecto

```
11-fullstack-project/
├── backend/           # API REST con Node.js y Express
├── frontend/          # Aplicación Angular
└── database/          # Scripts SQL y configuración de BD
```

## 🛠️ Instalación y Configuración

### 1️⃣ Configurar la Base de Datos MySQL

1. Inicia MySQL (MySQL Workbench o línea de comandos)

2. Ejecuta el script de la base de datos:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

   O copia y pega el contenido del archivo `database/schema.sql` en MySQL Workbench.

3. Verifica que la base de datos se creó correctamente:
   ```sql
   USE fullstack_db;
   SHOW TABLES;
   SELECT * FROM users;
   SELECT * FROM products;
   ```

### 2️⃣ Configurar el Backend

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las credenciales de la base de datos:
   - Copia el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   
   - Edita el archivo `.env` con tus credenciales de MySQL:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=tu_password_de_mysql
     DB_NAME=fullstack_db
     DB_PORT=3306
     PORT=3000
     ```

4. Inicia el servidor backend:
   ```bash
   npm run dev
   ```

   El backend estará disponible en: `http://localhost:3000`

### 3️⃣ Configurar el Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

   La aplicación estará disponible en: `http://localhost:4200`

## 🎯 Uso del Proyecto

### Backend API Endpoints

#### Usuarios (Users)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener un usuario específico
- `POST /api/users` - Crear un nuevo usuario
- `PUT /api/users/:id` - Actualizar un usuario
- `DELETE /api/users/:id` - Eliminar un usuario

#### Productos (Products)
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto
- `DELETE /api/products/:id` - Eliminar un producto

### Frontend

La aplicación tiene 3 páginas principales:

1. **Inicio** (`/`) - Página de bienvenida con información del proyecto
2. **Usuarios** (`/users`) - CRUD completo de usuarios
3. **Productos** (`/products`) - CRUD completo de productos

## 🧪 Probar la API con cURL

```bash
# Obtener todos los usuarios
curl http://localhost:3000/api/users

# Crear un nuevo usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Obtener todos los productos
curl http://localhost:3000/api/products
```

## 📦 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MySQL2** - Cliente MySQL para Node.js
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reinicio en desarrollo

### Frontend
- **Angular 19** - Framework frontend
- **TypeScript** - Lenguaje de programación
- **HttpClient** - Cliente HTTP de Angular
- **FormsModule** - Formularios de Angular
- **RouterModule** - Navegación entre páginas

### Base de Datos
- **MySQL 8.0** - Sistema de gestión de bases de datos relacional

## 🚨 Solución de Problemas

### Error de conexión a MySQL

Si ves el error "Access denied for user", verifica:
1. Que MySQL esté ejecutándose
2. Que las credenciales en `.env` sean correctas
3. Que el usuario tenga permisos en la base de datos

### Error CORS en el frontend

El backend ya está configurado con CORS. Si aún hay problemas, verifica que:
1. El backend esté corriendo en el puerto 3000
2. El frontend use la URL correcta: `http://localhost:3000`

### Puerto ya en uso

Si el puerto 3000 o 4200 están en uso:
- Backend: Cambia el `PORT` en el archivo `.env`
- Frontend: Usa `ng serve --port 4300`

## 📝 Comandos Útiles

```bash
# Backend
npm run dev          # Iniciar en modo desarrollo
npm start           # Iniciar en modo producción

# Frontend
ng serve            # Iniciar servidor de desarrollo
ng build            # Compilar para producción
ng generate component [nombre]  # Crear nuevo componente

# Base de datos
mysql -u root -p    # Conectar a MySQL
```

## 🎉 ¡Listo!

Tu aplicación fullstack está funcionando. Abre:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- Base de datos: MySQL en puerto 3306

---

**Desarrollado sin Docker** para facilitar el desarrollo local y el aprendizaje.
