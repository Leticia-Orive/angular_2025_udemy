/**
 * MODELO USER (USUARIO)
 * ======================
 *
 * Interface TypeScript que define la estructura básica de un usuario en la aplicación.
 *
 * Propiedades:
 * - id?: number - Identificador único (opcional al crear, generado por MySQL)
 * - name: string - Nombre completo del usuario (requerido)
 * - email: string - Correo electrónico único (requerido)
 * - created_at?: string - Fecha de creación (generada automáticamente)
 * - updated_at?: string - Fecha de última actualización (generada automáticamente)
 *
 * Nota de seguridad:
 * - Esta interface NO incluye password ni role por seguridad
 * - password solo se usa al crear/autenticar, nunca se retorna en consultas
 * - role está en tabla users pero se maneja en AuthService.User
 * - Este modelo es para UserService (gestión administrativa)
 * - Ver AuthService.User para modelo completo con role
 *
 * Diferencia entre modelos:
 * - models/user.model.ts → User: Para CRUD administrativo (UserService)
 * - services/auth.service.ts → User: Para autenticación con role (AuthService)
 *
 * Relación con base de datos:
 * - Tabla: users
 * - Campos en DB: id, name, email, password (hasheada), role, created_at, updated_at
 * - password NUNCA se retorna en consultas GET (seguridad)
 *
 * Uso:
 * - UserService: Tipo de datos para peticiones HTTP CRUD
 * - UsersComponent: Formularios de gestión de usuarios (admin only)
 * - Listados administrativos sin información sensible
 */

export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}
