/**
 * COMPONENTE DE INICIO DE SESIÓN
 *
 * Este componente maneja el formulario de autenticación de usuarios.
 * Permite a los usuarios iniciar sesión con email y contraseña.
 *
 * Funcionalidades:
 * - Formulario reactivo con validaciones
 * - Autenticación a través del AuthService
 * - Redirección después del login exitoso
 * - Manejo de errores
 * - Botones de relleno automático para testing
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/user.model';

@Component({
  selector: 'app-login',               // Selector para usar el componente en templates
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // PROPIEDADES DEL COMPONENTE

  loginForm!: FormGroup;    // Formulario reactivo para el login
  loading = false;          // Estado de carga durante la autenticación
  error = '';              // Mensaje de error si falla el login
  returnUrl = '/';         // URL de redirección después del login exitoso

  // CONSTRUCTOR - Inyección de dependencias
  constructor(
    private formBuilder: FormBuilder,    // Servicio para crear formularios reactivos
    private authService: AuthService,    // Servicio de autenticación
    private router: Router,              // Servicio de navegación
    private route: ActivatedRoute        // Información de la ruta actual
  ) {}

  // HOOK DE CICLO DE VIDA - Se ejecuta después de inicializar el componente
  ngOnInit(): void {
    this.createForm();
    // Obtener la URL de retorno si existe en los query parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // MÉTODO PRIVADO - Crea el formulario reactivo con validaciones
  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],     // Campo email con validaciones
      password: ['', [Validators.required]]                     // Campo password requerido
    });
  }

  // MÉTODO PÚBLICO - Maneja el envío del formulario
  onSubmit(): void {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.error = '';

      // Preparar datos para enviar al servicio
      const loginData: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // Llamar al servicio de autenticación
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate([this.returnUrl]);    // Redirigir en caso de éxito
        },
        error: (error) => {
          this.error = error.message || 'Error al iniciar sesión';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  // MÉTODOS DE UTILIDAD - Para rellenar formulario con datos de ejemplo (desarrollo/testing)

  // Método público para rellenar credenciales de administrador
  fillAdminCredentials(): void {
    this.loginForm.patchValue({
      email: 'admin@tienda.com',
      password: 'admin123'
    });
  }

  // Método público para rellenar credenciales de cliente
  fillClientCredentials(): void {
    this.loginForm.patchValue({
      email: 'cliente@tienda.com',
      password: 'cliente123'
    });
  }

  // GETTERS - Proporcionan acceso fácil a los campos del formulario desde el template
  get email() { return this.loginForm.get('email'); }      // Getter para el campo email
  get password() { return this.loginForm.get('password'); } // Getter para el campo password
}
