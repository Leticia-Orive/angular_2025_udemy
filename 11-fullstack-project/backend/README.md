# Backend - API REST con Node.js + Express + MySQL

API REST para gestión de usuarios y productos.

## Iniciar el servidor

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de MySQL

# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

## Endpoints Disponibles

### Usuarios
- `GET /api/users` - Listar todos
- `GET /api/users/:id` - Obtener uno
- `POST /api/users` - Crear
- `PUT /api/users/:id` - Actualizar
- `DELETE /api/users/:id` - Eliminar

### Productos
- `GET /api/products` - Listar todos
- `GET /api/products/:id` - Obtener uno
- `POST /api/products` - Crear
- `PUT /api/products/:id` - Actualizar
- `DELETE /api/products/:id` - Eliminar

## Configuración

Archivo `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=fullstack_db
DB_PORT=3306
PORT=3000
```

El servidor estará disponible en `http://localhost:3000`
