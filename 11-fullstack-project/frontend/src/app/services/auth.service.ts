/**
 * SERVICIO AUTH (AUTENTICACIÓN)
 * ==============================
 *
 * Funcionalidad:
 * - Gestiona toda la autenticación de usuarios en la aplicación
 * - Maneja registro, login, logout y verificación de sesión
 * - Almacena token JWT y datos del usuario en localStorage
 * - Proporciona estado reactivo del usuario actual con RxJS
 *
 * Características principales:
 * - BehaviorSubject para estado de usuario (reactivo)
 * - Observable currentUser$ que notifica cambios de autenticación
 * - Persistencia en localStorage (token + currentUser)
 * - Integración con backend JWT (/api/auth)
 *
 * Interfaces:
 * - User: { id, name, email, role }
 * - AuthResponse: { message, user, token }
 *
 * Métodos de autenticación:
 * - register(name, email, password, role): Registra nuevo usuario
 *   · Role por defecto: 'user'
 *   · Guarda token y usuario en localStorage
 *   · Actualiza currentUserSubject
 *
 * - login(email, password): Inicia sesión
 *   · Valida credenciales con backend
 *   · Recibe token JWT (válido 24h)
 *   · Guarda datos en localStorage
 *
 * - logout(): Cierra sesión
 *   · Limpia localStorage (token + currentUser)
 *   · Resetea currentUserSubject a null
 *   · Limpia carrito del usuario
 *
 * Métodos de estado:
 * - getCurrentUser(): Obtiene usuario actual desde BehaviorSubject
 * - isLoggedIn(): Verifica si hay token válido
 * - isAdmin(): Verifica si el rol es 'admin'
 * - getToken(): Obtiene token JWT desde localStorage
 *
 * Persistencia:
 * - localStorage.token: JWT para autenticar peticiones HTTP
 * - localStorage.currentUser: Datos del usuario en JSON
 * - Se restaura al recargar la página (getUserFromStorage)
 *
 * Integración con otros servicios:
 * - CartService escucha currentUser$ para cambiar carrito por usuario
 * - AuthGuard usa isLoggedIn() e isAdmin() para proteger rutas
 * - Components usan currentUser$ para mostrar/ocultar elementos
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  register(name: string, email: string, password: string, role: string = 'user'): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { name, email, password, role })
      .pipe(
        tap(response => {
          this.setUserData(response);
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.setUserData(response);
        })
      );
  }

  private setUserData(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'user';
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}
