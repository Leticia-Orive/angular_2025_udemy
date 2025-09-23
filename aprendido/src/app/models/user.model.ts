/**
 * MODELOS DE USUARIO Y AUTENTICACIÓN
 * 
 * Este archivo define todas las interfaces y tipos relacionados con los usuarios
 * del sistema, incluyendo roles, datos de usuario y operaciones de autenticación.
 */

/**
 * ENUM: Roles de usuario en el sistema
 * 
 * Define los diferentes niveles de acceso que puede tener un usuario:
 * - CLIENT: Usuario cliente con acceso básico (comprar productos, ver tienda)
 * - ADMIN: Usuario administrador con acceso completo (gestionar productos, usuarios)
 */
export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

/**
 * INTERFACE: Modelo completo de usuario
 * 
 * Define la estructura de datos de un usuario en el sistema.
 * Incluye información personal, credenciales y metadatos.
 */
export interface User {
  id: string;          // Identificador único del usuario
  email: string;       // Correo electrónico (usado para login)
  password: string;    // Contraseña encriptada
  firstName: string;   // Nombre del usuario
  lastName: string;    // Apellido del usuario
  role: UserRole;      // Rol/permisos del usuario
  createdAt: Date;     // Fecha de creación de la cuenta
}

/**
 * INTERFACE: Datos requeridos para iniciar sesión
 * 
 * Define la estructura de datos que el cliente debe enviar
 * para autenticarse en el sistema.
 */
export interface LoginRequest {
  email: string;       // Correo electrónico del usuario
  password: string;    // Contraseña del usuario
}

/**
 * INTERFACE: Datos requeridos para registrar un nuevo usuario
 * 
 * Define la estructura de datos necesaria para crear una nueva
 * cuenta de usuario en el sistema.
 */
export interface RegisterRequest {
  email: string;       // Correo electrónico único
  password: string;    // Contraseña elegida por el usuario
  firstName: string;   // Nombre del nuevo usuario
  lastName: string;    // Apellido del nuevo usuario
  role: UserRole;      // Rol asignado al usuario
}

/**
 * INTERFACE: Respuesta de autenticación exitosa
 * 
 * Define la estructura de datos que el servidor devuelve
 * después de una autenticación exitosa (login/register).
 * 
 * Nota: Omite la password del objeto User por seguridad.
 */
export interface AuthResponse {
  user: Omit<User, 'password'>;  // Datos del usuario sin la contraseña
  token: string;                 // Token JWT para autenticación posterior
}
