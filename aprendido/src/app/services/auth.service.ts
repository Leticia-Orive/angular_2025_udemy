import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User, UserRole, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Omit<User, 'password'> | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

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
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Simulamos una llamada al backend
    return of(this.users.find(user =>
      user.email === credentials.email && user.password === credentials.password
    )).pipe(
      delay(1000), // Simular delay de red
      map(user => {
        if (!user) {
          throw new Error('Credenciales inválidas');
        }

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

        // Guardar usuario en localStorage y actualizar estado
        localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
        localStorage.setItem('token', authResponse.token);
        this.currentUserSubject.next(authResponse.user);

        return authResponse;
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Verificar si el email ya existe
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const newUser: User = {
      id: (this.users.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      createdAt: new Date()
    };

    this.users.push(newUser);

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

    // Guardar usuario en localStorage y actualizar estado
    localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
    localStorage.setItem('token', authResponse.token);
    this.currentUserSubject.next(authResponse.user);

    return of(authResponse).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.ADMIN;
  }

  getCurrentUser(): Omit<User, 'password'> | null {
    return this.currentUserSubject.value;
  }

  private generateToken(user: User): string {
    // En un proyecto real, esto sería generado por el backend
    return btoa(JSON.stringify({ userId: user.id, role: user.role, timestamp: Date.now() }));
  }
}
