// COMPONENTE DE REGISTRO DE USUARIOS
// Demuestra validaciones complejas: síncronas, asíncronas y validadores personalizados
// Incluye confirmación de password, validación de email en servidor, patrones regex
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],  // JsonPipe para debug, ReactiveFormsModule para formularios
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  // Inyección del FormBuilder para construir formularios complejos
  fb = inject(FormBuilder);

  // Utilidades con validadores personalizados y patrones regex
  formUtils = FormUtils;

  // FORMULARIO DE REGISTRO con validaciones avanzadas en múltiples niveles
  myForm = this.fb.group({
    // CAMPO NOMBRE: Validación con patrón regex personalizado
    name: ['', [
      Validators.required,
      Validators.pattern(FormUtils.namePattern)  // Solo letras y espacios
    ]],

    // CAMPO EMAIL: Validación síncrona + asíncrona
    email: ['',
      // Validadores síncronos
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      // Validadores asíncronos (simulan consulta al servidor)
      [FormUtils.checkingServerResponse]
    ],

    // CAMPO USERNAME: Múltiples validaciones síncronas personalizadas
    username: ['', [
      Validators.required,
      Validators.minLength(6),                           // Mínimo 6 caracteres
      Validators.pattern(FormUtils.notOnlySpacesPattern), // No solo espacios
      FormUtils.notStrider                               // No puede ser "strider"
    ]],

    // CAMPO PASSWORD: Validación básica de longitud
    password: ['', [Validators.required, Validators.minLength(6)]],

    // CAMPO CONFIRMACIÓN: Se valida a nivel de FormGroup
    password2: ['', [Validators.required]],
  }, {
    // VALIDADORES A NIVEL DE FORMGROUP
    // Se ejecutan después de los validadores individuales de cada campo
    validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')]
    // Alternativa estática: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
  });



  // MÉTODO para procesar el envío del formulario
  onSubmit() {
    // Marcar todos los campos como 'touched' para mostrar errores de validación
    this.myForm.markAllAsTouched();

    // En un caso real, solo enviar si el formulario es válido:
    // if (this.myForm.invalid) return;

    // Mostrar los valores del formulario para debug
    console.log(this.myForm.value);

    // Aquí iría la lógica para enviar los datos al servidor
  }
}
