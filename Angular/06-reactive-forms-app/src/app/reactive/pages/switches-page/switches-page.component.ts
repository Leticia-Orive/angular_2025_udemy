// COMPONENTE DE CONTROLES ESPECIALES
// Demuestra el uso de switches, checkboxes, radio buttons y validaciones booleanas
// Casos de uso: términos y condiciones, preferencias de usuario, selección de género
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],  // JsonPipe para debug, ReactiveFormsModule para formularios
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  // Inyección del FormBuilder para construir formularios
  private fb = inject(FormBuilder);

  // Utilidades compartidas para validación de formularios
  formUtils = FormUtils;

  // FORMULARIO con diferentes tipos de controles booleanos y de selección
  myForm: FormGroup = this.fb.group({
    // Radio button para selección de género (valor por defecto: 'M')
    gender: ['M', Validators.required],

    // Switch/Checkbox para notificaciones (valor por defecto: true)
    // No requiere validación específica, es opcional
    wathNotifications: [true],

    // Checkbox para términos y condiciones (debe ser true para ser válido)
    // Validators.requiredTrue: El usuario DEBE aceptar los términos
    termsAndConditions: [false, Validators.requiredTrue]
  });

  // MÉTODO para enviar el formulario
  onSubmit() {
    // Marcar todos los campos como 'touched' para mostrar errores
    this.myForm.markAllAsTouched();

    // Mostrar los valores del formulario (solo si es válido en un caso real)
    console.log(this.myForm.value);
  }
 }
