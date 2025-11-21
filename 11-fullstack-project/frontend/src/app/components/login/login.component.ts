/**
 * COMPONENTE LOGIN (INICIO DE SESIÓN)
 * ====================================
 *
 * Funcionalidad:
 * - Formulario de inicio de sesión para usuarios registrados
 * - Valida credenciales contra el backend
 * - Guarda token JWT y datos de usuario en localStorage
 * - Redirige a /products tras login exitoso
 *
 * Características:
 * - Formulario con email y password
 * - Validación de campos requeridos
 * - Estado de loading durante petición HTTP
 * - Manejo de errores con mensajes descriptivos
 * - Link a página de registro (/register)
 *
 * Propiedades:
 * - email: string - Campo de correo electrónico
 * - password: string - Campo de contraseña
 * - error: string - Mensaje de error si falla el login
 * - loading: boolean - Estado de carga durante petición
 *
 * Método onSubmit():
 * - Validación: Verifica que email y password no estén vacíos
 * - Autenticación: Llama a authService.login(email, password)
 * - Success: Guarda token JWT, actualiza currentUser$, navega a /products
 * - Error: Muestra mensaje de error (credenciales inválidas, usuario no encontrado)
 * - Loading: Activa estado de carga durante petición HTTP
 *
 * Flujo de autenticación:
 * 1. Usuario ingresa email y password
 * 2. onSubmit() envía petición POST a /api/auth/login
 * 3. Backend valida con bcrypt.compare()
 * 4. Si válido: Backend retorna { user, token }
 * 5. AuthService guarda en localStorage y actualiza BehaviorSubject
 * 6. CartService detecta cambio y carga carrito del usuario
 * 7. Router navega a /products
 *
 * Integración:
 * - AuthService: login(email, password) → Observable<AuthResponse>
 * - Router: navigate(['/products']) tras login exitoso
 * - FormsModule: [(ngModel)] para two-way binding en formulario
 *
 * Template:
 * - login.component.html: Formulario con campos email/password
 * - login.component.css: Estilos del formulario y botones
 * - RouterLink a /register para nuevos usuarios
 *
 * Manejo de errores comunes:
 * - "Usuario no encontrado" - Email no registrado
 * - "Contraseña incorrecta" - Password no coincide
 * - "Por favor completa todos los campos" - Validación frontend
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al iniciar sesión';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
