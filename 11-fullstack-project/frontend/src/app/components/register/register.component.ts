/**
 * COMPONENTE REGISTER (REGISTRO DE USUARIO)
 * ==========================================
 *
 * Funcionalidad:
 * - Formulario de registro para nuevos usuarios
 * - Valida datos del formulario (campos, contraseñas, longitud)
 * - Crea cuenta en backend con password hasheada
 * - Inicia sesión automáticamente tras registro exitoso
 * - Redirige a /products tras completar registro
 *
 * Características:
 * - Formulario con name, email, password, confirmPassword
 * - Selector de rol (user/admin) - opcional, por defecto 'user'
 * - Validaciones frontend múltiples
 * - Estado de loading durante petición HTTP
 * - Manejo de errores con mensajes descriptivos
 * - Link a página de login (/login)
 *
 * Propiedades:
 * - name: string - Nombre completo del usuario
 * - email: string - Correo electrónico único
 * - password: string - Contraseña (mínimo 6 caracteres)
 * - confirmPassword: string - Confirmación de contraseña
 * - role: string - Rol del usuario ('user' por defecto, puede ser 'admin')
 * - error: string - Mensaje de error si falla el registro
 * - loading: boolean - Estado de carga durante petición
 *
 * Validaciones en onSubmit():
 * 1. Campos requeridos: Verifica que ningún campo esté vacío
 * 2. Contraseñas coinciden: password === confirmPassword
 * 3. Longitud mínima: password.length >= 6
 * 4. Email único: Backend valida que no exista (error si duplicado)
 *
 * Flujo de registro:
 * 1. Usuario completa formulario (name, email, password, confirmPassword)
 * 2. onSubmit() valida datos en frontend
 * 3. Petición POST a /api/auth/register con datos del formulario
 * 4. Backend hashea password con bcrypt (10 rondas)
 * 5. Backend verifica email único en base de datos
 * 6. Si válido: Crea usuario y retorna { user, token }
 * 7. AuthService guarda token JWT y usuario en localStorage
 * 8. Se inicia sesión automáticamente (no requiere login separado)
 * 9. Router navega a /products
 *
 * Integración:
 * - AuthService: register(name, email, password, role) → Observable<AuthResponse>
 * - Router: navigate(['/products']) tras registro exitoso
 * - FormsModule: [(ngModel)] para two-way binding en formulario
 *
 * Template:
 * - register.component.html: Formulario con campos name/email/password/confirmPassword/role
 * - register.component.css: Estilos del formulario y botones
 * - RouterLink a /login para usuarios existentes
 *
 * Manejo de errores comunes:
 * - "El email ya está registrado" - Email duplicado en BD
 * - "Las contraseñas no coinciden" - password !== confirmPassword
 * - "La contraseña debe tener al menos 6 caracteres" - Validación longitud
 * - "Por favor completa todos los campos" - Campos vacíos
 *
 * Seguridad:
 * - Password nunca se almacena en texto plano
 * - Bcrypt hashea password antes de guardar en BD
 * - Token JWT generado automáticamente tras registro
 * - Role 'user' por defecto (admin solo por formulario explícito)
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'user';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Validaciones
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.name, this.email, this.password, this.role).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al registrar usuario';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
