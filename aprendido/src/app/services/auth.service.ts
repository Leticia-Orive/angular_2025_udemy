/**
 * SERVICIO DE AUTENTICACIÓN
 * 
 * Este servicio maneja toda la lógica relacionada con la autenticación de usuarios,
 * incluyendo login, registro, logout y verificación de permisos.
 * 
 * Características principales:
 * - Gestión del estado de autenticación global
 * - Persistencia de sesión en localStorage
 * - Simulación de backend con datos mock
 * - Verificación de roles y permisos
 * - Observables para reactividad en componentes
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User, UserRole, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'  // Singleton disponible en toda la aplicación
})
export class AuthService {
  
  // ESTADO GLOBAL DE AUTENTICACIÓN
  // BehaviorSubject mantiene el último valor emitido y lo proporciona a nuevos suscriptores
  private currentUserSubject = new BehaviorSubject<Omit<User, 'password'> | null>(null);
  
  // Observable público para que los componentes puedan suscribirse a cambios del usuario
  public currentUser$ = this.currentUserSubject.asObservable();

  // DATOS MOCK - En una aplicación real, estos vendrían del backend
  private users: User[] = [
    {
      id: '1',
      email: 'admin@tienda.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'System',
      role: UserRole.ADMIN,
      createdAt: new Date()
    },
    {
      id: '2',
      email: 'cliente@tienda.com',
      password: 'cliente123',
      firstName: 'Cliente',
      lastName: 'Test',
      role: UserRole.CLIENT,
      createdAt: new Date()
    }
  ];

  constructor() {
    // RECUPERACIÓN DE SESIÓN PERSISTIDA
    // Al inicializar el servicio, verifica si hay una sesión guardada
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  /**
   * MÉTODO: Iniciar sesión
   * 
   * Autentica al usuario con email y contraseña.
   * Simula una llamada al backend con delay y validación.
   * 
   * @param credentials - Email y contraseña del usuario
   * @returns Observable con la respuesta de autenticación
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Simulamos una llamada al backend con búsqueda de usuario
    return of(this.users.find(user =>
      user.email === credentials.email && user.password === credentials.password
    )).pipe(
      delay(1000), // Simula delay de red realista
      map(user => {
        if (!user) {
          throw new Error('Credenciales inválidas');
        }

        // Preparar respuesta sin incluir la contraseña por seguridad
        const authResponse: AuthResponse = {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt
          },
          token: this.generateToken(user)
        };

        // PERSISTIR SESIÓN y ACTUALIZAR ESTADO GLOBAL
        localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
        localStorage.setItem('token', authResponse.token);
        this.currentUserSubject.next(authResponse.user);

        return authResponse;
      })
    );
  }

  /**
   * MÉTODO: Registrar nuevo usuario
   * 
   * Crea una nueva cuenta de usuario después de validar que el email sea único.
   * En una app real, esto enviaría datos al backend para crear el usuario.
   * 
   * @param userData - Datos del nuevo usuario a registrar
   * @returns Observable con la respuesta de autenticación
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Verificar que el email no esté ya en uso
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear nuevo usuario con ID generado
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      createdAt: new Date()
    };

    // Añadir usuario a la lista mock
    this.users.push(newUser);

    // Preparar respuesta de autenticación exitosa
    const authResponse: AuthResponse = {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        createdAt: newUser.createdAt
      },
      token: this.generateToken(newUser)
    };

    // PERSISTIR SESIÓN del nuevo usuario
    localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
    localStorage.setItem('token', authResponse.token);
    this.currentUserSubject.next(authResponse.user);

    return of(authResponse).pipe(delay(1000));
  }

  /**
   * MÉTODO: Cerrar sesión
   * 
   * Limpia toda la información de sesión tanto del estado de la aplicación
   * como del almacenamiento local del navegador.
   */
  logout(): void {
    // Limpiar almacenamiento local
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    
    // Limpiar estado global de la aplicación
    this.currentUserSubject.next(null);
  }

  /**
   * MÉTODO: Verificar si el usuario está autenticado
   * 
   * @returns true si hay un usuario logueado, false en caso contrario
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * MÉTODO: Verificar si el usuario actual es administrador
   * 
   * @returns true si el usuario tiene rol ADMIN, false en caso contrario
   */
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.ADMIN;
  }

  /**
   * MÉTODO: Obtener datos del usuario actual
   * 
   * @returns Objeto con datos del usuario sin contraseña, o null si no está logueado
   */
  getCurrentUser(): Omit<User, 'password'> | null {
    return this.currentUserSubject.value;
  }

  /**
   * MÉTODO PRIVADO: Generar token de autenticación
   * 
   * En una aplicación real, el token JWT sería generado por el backend
   * y contendría información encriptada y firmada digitalmente.
   * 
   * @param user - Usuario para el cual generar el token
   * @returns Token de autenticación codificado en base64
   */
  private generateToken(user: User): string {
    // Simulación de token JWT (en producción viene del backend)
    return btoa(JSON.stringify({ 
      userId: user.id, 
      role: user.role, 
      timestamp: Date.now() 
    }));
  }
}
