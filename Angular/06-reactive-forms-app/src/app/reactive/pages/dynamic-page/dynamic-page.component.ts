// COMPONENTE DE FORMULARIOS DINÁMICOS
// Demuestra el uso de FormArray para manejar listas dinámicas de campos
// Casos de uso: agregar/quitar elementos, validación de arrays, controles dinámicos
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,  FormArray, FormControl } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],  // JsonPipe para debug, ReactiveFormsModule para formularios
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  // Inyección del FormBuilder para construir formularios de manera declarativa
  private fb = inject(FormBuilder);

  // Utilidades compartidas para validación y manejo de formularios
  FormUtils = FormUtils;

  // FORMULARIO PRINCIPAL con FormArray para lista dinámica
  myForm: FormGroup = this.fb.group({
    // Campo básico para el nombre del usuario
    name: ['', [Validators.required, Validators.minLength(3)]],

    // FormArray: Array dinámico de controles para lista de juegos favoritos
    favoriteGames: this.fb.array(
      [
        // Controles iniciales con valores por defecto
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ],
      // Validador del array: mínimo 2 juegos requeridos
      Validators.minLength(2)
    )
  });

  // CONTROL INDEPENDIENTE para agregar nuevos juegos
  // Se usa temporalmente antes de agregarlo al FormArray principal
  newFavorite = new FormControl('', Validators.required);
  //newFavorite = this.fb.control([]); // Alternativa con FormBuilder

  // GETTER para acceder al FormArray de juegos favoritos
  // Facilita el acceso al array desde el template y métodos del componente
  // El casting 'as FormArray' asegura el tipo correcto para TypeScript
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // MÉTODO para agregar un nuevo juego favorito al FormArray
  onAddToFavorites() {
    // Validación: solo agregar si el campo temporal es válido
    if (this.newFavorite.invalid)
      return;

    // Obtener el valor del control temporal
    const newGame = this.newFavorite.value;

    // Crear nuevo FormControl y agregarlo al FormArray
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    // Limpiar el campo temporal para el siguiente juego
    this.newFavorite.reset();
  }

  // MÉTODO para eliminar un juego favorito por su índice
  onRemoveFavorite(index: number) {
    // removeAt() elimina el control en la posición especificada
    this.favoriteGames.removeAt(index);
  }

  // MÉTODO para enviar el formulario
  onSubmit() {
    // Mostrar los valores actuales del formulario
    console.log(this.myForm.value);

    // Marcar todos los campos como 'touched' para mostrar errores de validación
    this.myForm.markAllAsTouched();
  }
}
