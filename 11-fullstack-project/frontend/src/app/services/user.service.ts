/**
 * SERVICIO USER (USUARIOS)
 * =========================
 *
 * Funcionalidad:
 * - Gestiona todas las operaciones HTTP relacionadas con usuarios
 * - Conecta el frontend con la API REST de usuarios en el backend
 * - Usado principalmente por UsersComponent (solo administradores)
 *
 * API Endpoint: http://localhost:3000/api/users
 *
 * Nota de seguridad:
 * - Este servicio es diferente de AuthService
 * - AuthService maneja login/register/logout con tokens JWT
 * - UserService maneja CRUD administrativo de usuarios
 * - El acceso debe estar protegido en el backend con middleware JWT
 *
 * Métodos disponibles:
 * - getUsers(): Observable<User[]>
 *   · GET /api/users
 *   · Obtiene listado completo de usuarios
 *   · Solo accesible por administradores
 *
 * - getUser(id): Observable<User>
 *   · GET /api/users/:id
 *   · Obtiene un usuario específico por su ID
 *
 * - createUser(user): Observable<User>
 *   · POST /api/users
 *   · Crea un nuevo usuario (modo administrativo)
 *   · Body: { name, email }
 *   · Diferente de /api/auth/register (no requiere password)
 *
 * - updateUser(id, user): Observable<User>
 *   · PUT /api/users/:id
 *   · Actualiza datos de un usuario existente
 *   · Body: { name?, email? }
 *
 * - deleteUser(id): Observable<any>
 *   · DELETE /api/users/:id
 *   · Elimina un usuario por ID
 *   · Retorna mensaje de confirmación
 *
 * Uso en componentes:
 * - UsersComponent: Gestión completa de usuarios (admin only)
 * - Formulario CRUD para name y email
 *
 * Integración con backend:
 * - Usa HttpClient de Angular para peticiones HTTP
 * - Retorna Observables (RxJS) para manejo asíncrono
 * - Los componentes se suscriben con .subscribe()
 *
 * Modelo User:
 * - Interface definida en models/user.model.ts
 * - Campos: id?, name, email, created_at?, updated_at?
 * - No incluye password en el modelo (seguridad)
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
