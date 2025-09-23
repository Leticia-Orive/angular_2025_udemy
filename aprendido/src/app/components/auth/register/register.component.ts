/**
 * COMPONENTE DE REGISTRO DE USUARIOS
 *
 * Este componente maneja el formulario de registro para nuevos usuarios.
 * Permite crear cuentas con diferentes roles (Cliente o Administrador).
 *
 * Funcionalidades:
 * - Formulario reactivo con validaciones complejas
 * - Validación de coincidencia de contraseñas
 * - Selección de rol de usuario
 * - Registro a través del AuthService
 * - Redirección después del registro exitoso
 * - Manejo de errores
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UserRole, RegisterRequest } from '../../../models/user.model';

@Component({
  selector: 'app-register',          // Selector para usar el componente en templates
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  // PROPIEDADES DEL COMPONENTE

  registerForm!: FormGroup;    // Formulario reactivo para el registro
  loading = false;             // Estado de carga durante el registro
  error = '';                 // Mensaje de error si falla el registro
  userRoles = UserRole;       // Enum de roles disponibles para el select

  // CONSTRUCTOR - Inyección de dependencias
  constructor(
    private formBuilder: FormBuilder,    // Servicio para crear formularios reactivos
    private authService: AuthService,    // Servicio de autenticación y registro
    private router: Router               // Servicio de navegación
  ) {}

  // HOOK DE CICLO DE VIDA - Se ejecuta después de inicializar el componente
  ngOnInit(): void {
    this.createForm();
  }

  // MÉTODO PRIVADO - Crea el formulario reactivo con validaciones
  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],                    // Email con validación
      password: ['', [Validators.required, Validators.minLength(6)]],          // Contraseña mínimo 6 caracteres
      confirmPassword: ['', [Validators.required]],                            // Confirmación de contraseña
      firstName: ['', [Validators.required, Validators.minLength(2)]],         // Nombre mínimo 2 caracteres
      lastName: ['', [Validators.required, Validators.minLength(2)]],          // Apellido mínimo 2 caracteres
      role: [UserRole.CLIENT, [Validators.required]]                           // Rol por defecto: CLIENT
    }, { validators: this.passwordMatchValidator });                           // Validador personalizado
  }

  // VALIDADOR PERSONALIZADO - Verifica que las contraseñas coincidan
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  // MÉTODO PÚBLICO - Maneja el envío del formulario
  onSubmit(): void {
    if (this.registerForm.valid && !this.loading) {
      this.loading = true;
      this.error = '';

      // Preparar datos para enviar al servicio
      const registerData: RegisterRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        role: this.registerForm.value.role
      };

      // Llamar al servicio de registro
      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente:', response);
          this.router.navigate(['/']);    // Redirigir a la página principal
        },
        error: (error) => {
          this.error = error.message || 'Error al registrar usuario';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  // GETTERS - Proporcionan acceso fácil a los campos del formulario desde el template
  get email() { return this.registerForm.get('email'); }                      // Getter para el campo email
  get password() { return this.registerForm.get('password'); }                // Getter para el campo password
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }  // Getter para confirmar password
  get firstName() { return this.registerForm.get('firstName'); }              // Getter para el nombre
  get lastName() { return this.registerForm.get('lastName'); }                // Getter para el apellido
  get role() { return this.registerForm.get('role'); }                        // Getter para el rol
}
